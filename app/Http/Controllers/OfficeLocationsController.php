<?php

namespace App\Http\Controllers;
use Illuminate\Support\Carbon;
use App\Models\OfficeLocation;
use App\Models\Country;
use App\Http\Requests\OfficeLocationUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Illuminate\Contracts\Database\Eloquent\Builder;

class OfficeLocationsController extends Controller
{
    public function index(Request $request,string $keyword='')
    {
        $locationsQuery=OfficeLocation::query();

        $locationsQuery->with('parent')->select('id', 'street', 'city', 'state', 'zipcode', 'country_id', 'phone', 'status');
        if(!empty($keyword)){
            $locationsQuery->orWhere('street','like','%'.$keyword.'%')
            ->where(function(Builder $query) use($keyword){
                $query->orWhere('city','like',$keyword.'%')->orWhere('state','like',$keyword.'%')->orWhere('zipcode','like',$keyword.'%')->orWhere('phone','like',$keyword.'%');

            });
        }
        
        $locations=$locationsQuery->where('deleted_at',NULL)->paginate(10);

        if($request->hasHeader('search')) {
            return response()->json($locations);
        }else{
            return Inertia::render('OfficeLocations/LocationList', [
                'locations'=>$locations,
                'keyword'=>$keyword
            ]);
        }
        
    }

    public function activate(Request $request,string $id): RedirectResponse
    {
        $location=OfficeLocation::select('id','status')->find($id);

        if(empty($location)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('officelocations');
        }

        $location->status=1-$location->status;
        $location->update();
        $request->session()->flash('message', 'Office Location have been '.($location->status ? 'activated' : 'deactivated').' successfully');
        return redirect()->route('officelocations');

    }

    public function delete(Request $request,string $id): RedirectResponse
    {
        $location=OfficeLocation::select('id','deleted_at')->find($id);

        if(empty($location)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('officelocations');
        }

        $location->deleted_at=Carbon::now();
        $location->update();
        $request->session()->flash('message', 'Office Location have been deleted successfully');
        return redirect()->route('officelocations');

    }

    public function create(Request $request): Response
    {
        $countries=Country::select('id','country_nicename')->get();
       // dd($countries);
        return Inertia::render('OfficeLocations/LocationAdd', [
            'countries'=>$countries,
        ]);
    }

    public function add(OfficeLocationUpdateRequest $request)
    {
       
        $data=$request->all();

        //dd($data);

        if(!empty($data['country_id'])){

            $countryExist=Country::select('id')->where('id',$data['country_id'])->first();

            if(empty($countryExist)){
                $request->session()->flash('message', 'Invalid Country');
                return redirect()->route('officelocations');
            }
        }
       
        try{
            OfficeLocation::create($data);
            $request->session()->flash('message', 'Office Location have been created successfully');
            return redirect()->route('officelocations');
        }
        catch (\PDOException $e) {
            die($e->getMessage());
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('officelocations');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save office location this time.');
        return redirect()->route('officelocations');
        

    }

    public function edit(Request $request,string $id): Response
    {
        if(empty($id)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('officelocations');
        }

        $location=OfficeLocation::select('id', 'street', 'city', 'state', 'zipcode', 'country_id', 'phone')->find($id);

        if(empty($location)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('officelocations');
        }

        $countries=Country::select('id','country_nicename')->get();
        
        return Inertia::render('OfficeLocations/LocationEdit', [
            'location'=>$location,
            'countries'=>$countries,
        ]);
        
    }

    public function update(OfficeLocationUpdateRequest $request,string $id)
    {
      
        if(empty($id)){
            $request->session()->flash('message', 'Location doesnot exist.');
            return redirect()->route('officelocations');
        }

        $location=OfficeLocation::select('id')->find($id);

        if(empty($location)){
            $request->session()->flash('message', 'Location doesnt exist.');
            return redirect()->route('officelocations');
        }

        $data=$request->all();

        $countryExist=Country::select('id')->where('id',$data['country_id'])->first();

        if(empty($countryExist)){
            $request->session()->flash('message', 'Country doesnot exist exist.');
            return redirect()->route('officelocations.edit',$id);
        }
       
        try{
            $location->update($data);
            $request->session()->flash('message', 'Office Location have been saved successfully');
            return redirect()->route('officelocations');
        }
        catch (\PDOException $e) {
            
            $request->session()->flash('message', 'Sorry, We are unable to save Office Location this time.');
            return redirect()->route('officelocations.edit',$id);
        }
        $request->session()->flash('message', 'Sorry, We are unable to save Office Location this time.');
        return redirect()->route('officelocations.edit',$id);
        

    }
}
