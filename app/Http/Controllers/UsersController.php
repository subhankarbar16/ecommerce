<?php

namespace App\Http\Controllers;
use Illuminate\Support\Carbon;
use App\Models\User;
use App\Models\Country;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Illuminate\Contracts\Database\Eloquent\Builder;
class UsersController extends Controller
{
    public function index(Request $request,string $keyword='')
    {

        $userQuery=User::query();
        $userQuery->with('parentCountry')->select('id','first_name','last_name','user_image','email','phone','status')->where(['user_type'=>1,'deleted_at'=>NULL]);
        if(!empty($keyword)){
            $userQuery->where(function(Builder $query) use($keyword){
                $query->where(['user_type'=>1])
                ->where('first_name','like',$keyword.'%')
                ->orWhere('last_name','like',$keyword.'%')
                ->orWhere('id',$keyword)
                ->orWhere('email','like',$keyword.'%');
            });
        }

        //dd($users);
        $users=$userQuery->orderBy('created_at')->paginate(2);
        if ($request->hasHeader('search')) {
            return response()->json($users);
        }else{
            return Inertia::render('Users/UserList', [
                'users'=>$users,
                'keyword'=>$keyword,
             ]);
        }
    }

    public function activate(string $userId): RedirectResponse
    {
        if(empty($userId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }

        $user=User::select('id','status')->where(['user_type'=>1,'deleted_at'=>NULL])->find($userId);

        if(empty($user)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }

        $user->status=1-$user->status;
        $user->update();

        return redirect()->route('users');

    }

    public function delete(string $userId): RedirectResponse
    {
        if(empty($userId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }

        $user=User::select('id','deleted_at')->where(['user_type'=>1,'deleted_at'=>NULL])->find($userId);

        if(empty($user)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }

        $user->deleted_at=Carbon::now();
        $user->update();

        return redirect()->route('users');

    }

    public function create(Request $request): Response
    {
        $countries=Country::select('id','country_nicename')->get();

        return Inertia::render('Users/UserAdd', [
            'countries'=>$countries,
        ]);
    }

    public function add(UserUpdateRequest $request)
    {
        $data=$request->all();

        if(!empty($data['country_id'])){

            $country=Country::select('id')->where('id',$data['country_id'])->first();

            if(empty($country)){
                $request->session()->flash('message', 'Invalid Country');
                return redirect()->route('users.add');
            }
        }

        $user_image=$request->file('user_image');
        unset($data['user_image']);
        unset($data['confirm_password']);
        if(!empty($user_image)){
            $user_image_filename=rand().$user_image->getClientOriginalName();
            $user_image->move(base_path('/public/images/users'), $user_image_filename);
            $data['user_image']=$user_image_filename;
        }
        $data['password']=Hash::make($data['password']);
        try{
            User::create($data);
            $request->session()->flash('message', 'User have been created successfully');
            return redirect()->route('users');
        }
        catch (\PDOException $e) {
            
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('users');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save user this time.');
        return redirect()->route('users');
        

    }

    public function edit(Request $request,string $userId)
    {
        if(empty($userId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }

        $user=User::select('id','first_name', 'last_name', 'street', 'city', 'state', 'country_id', 'zipcode', 'email', 'phone', 'user_image', 'user_type')->where(['user_type'=>1,'deleted_at'=>NULL])->find($userId);

        if(empty($user)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }
        $user['new_password']='';
        $user['confirm_password']='';

        $countries=Country::select('id','country_nicename')->get();

        return Inertia::render('Users/UserEdit', [
            'countries'=>$countries,
            'user'=>$user,
        ]);
    }

    public function update(UserUpdateRequest $request,string $userId)
    {
        if(empty($userId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }

        $user=User::select('id','first_name', 'last_name', 'street', 'city', 'state', 'country_id', 'zipcode', 'email', 'phone', 'user_image', 'user_type')->where(['user_type'=>1,'deleted_at'=>NULL])->find($userId);

        if(empty($user)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('users');
        }

        $data=$request->all();

        if(!empty($data['country_id'])){

            $country=Country::select('id')->where('id',$data['country_id'])->first();

            if(empty($country)){
                $request->session()->flash('message', 'Invalid Country');
                return redirect()->route('users.add');
            }
        }

        $user_image=$request->file('user_image');
        unset($data['user_image']);
        unset($data['confirm_password']);
        if(!empty($user_image)){
            $user_image_filename=rand().$user_image->getClientOriginalName();
            $user_image->move(base_path('/public/images/users'), $user_image_filename);
            $data['user_image']=$user_image_filename;
        }
        if(!empty($data['new_password'])){
            $data['password']=Hash::make($data['new_password']);
        }
        unset($data['new_password']);
        
        try{
            $user->update($data);
            $request->session()->flash('message', 'User have been updated successfully');
            return redirect()->route('users');
        }
        catch (\PDOException $e) {
            
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('users');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save user this time.');
        return redirect()->route('users');
        

    }
}
