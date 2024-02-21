<?php

namespace App\Http\Controllers;
use Illuminate\Support\Carbon;
use App\Models\ProductUnit;
use App\Models\Country;
use App\Http\Requests\ProductUnitUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ProductUnitsController extends Controller
{
    public function index(Request $request,string $keyword='')
    {
        $unitQuery=ProductUnit::query();

        $unitQuery->select('id', 'unit_name','status');
        if(!empty($keyword)){
            $unitQuery->where('unit_name','like',$keyword.'%');
        }
        
        $units=$unitQuery->where('deleted_at',NULL)->paginate(10);

        if($request->hasHeader('search')) {
            return response()->json($units);
        }else{
            return Inertia::render('ProductUnits/UnitList', [
                'units'=>$units,
                'keyword'=>$keyword
            ]);
        }
        
    }

    public function activate(Request $request,string $id): RedirectResponse
    {
        $unit=ProductUnit::select('id','status')->where('deleted_at',NULL)->find($id);

        if(empty($unit)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('productunits');
        }

        $unit->status=1-$unit->status;
        $unit->update();
        $request->session()->flash('message', 'Product Unit have been '.($unit->status ? 'activated' : 'deactivated').' successfully');
        return redirect()->route('productunits');

    }

    public function delete(Request $request,string $id): RedirectResponse
    {
        $unit=ProductUnit::select('id','deleted_at')->where('deleted_at',NULL)->find($id);

        if(empty($unit)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('productunits');
        }

        $unit->deleted_at=Carbon::now();
        $unit->update();
        $request->session()->flash('message', 'Product Unit have been deleted successfully');
        return redirect()->route('productunits');

    }

    public function create(Request $request): Response
    {
       
        return Inertia::render('ProductUnits/UnitAdd');
    }

    public function add(ProductUnitUpdateRequest $request)
    {
       
        $data=$request->all();
       
        try{
            ProductUnit::create($data);
            $request->session()->flash('message', 'Product Unit have been created successfully');
            return redirect()->route('productunits');
        }
        catch (\PDOException $e) {
            die($e->getMessage());
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('productunits');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save product unit this time.');
        return redirect()->route('productunits');
        
    }

    public function edit(Request $request,string $id): Response
    {
        if(empty($id)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('productunits');
        }

        $unit=ProductUnit::select('id', 'unit_name')->where('deleted_at',NULL)->find($id);

        if(empty($unit)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('productunits');
        }
        
        return Inertia::render('ProductUnits/UnitEdit', [
            'unit'=>$unit,
        ]);
        
    }

    public function update(ProductUnitUpdateRequest $request,string $id)
    {
      
        if(empty($id)){
            $request->session()->flash('message', 'Unit doesnot exist.');
            return redirect()->route('officelocations');
        }

        $unit=ProductUnit::select('id')->where('deleted_at',NULL)->find($id);

        if(empty($unit)){
            $request->session()->flash('message', 'Unit doesnt exist.');
            return redirect()->route('productunits');
        }

        $data=$request->all();
       
        try{
            $unit->update($data);
            $request->session()->flash('message', 'Product Unit have been saved successfully');
            return redirect()->route('productunits');
        }
        catch (\PDOException $e) {
            
            $request->session()->flash('message', 'Sorry, We are unable to save Product Unit this time.');
            return redirect()->route('productunits.edit',$id);
        }
        $request->session()->flash('message', 'Sorry, We are unable to save Product Unit this time.');
        return redirect()->route('productunits.edit',$id);
        

    }
}
