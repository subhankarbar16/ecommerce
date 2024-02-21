<?php

namespace App\Http\Controllers;

use Illuminate\Support\Carbon;
use App\Models\SocialLink;
use App\Http\Requests\SocialLinkUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Illuminate\Contracts\Database\Eloquent\Builder;

class SocialLinksController extends Controller
{
    public function index(Request $request,string $keyword='')
    {
        $linksQuery=SocialLink::query();

        $linksQuery->select('id', 'title', 'link', 'icon', 'status');
        if(!empty($keyword)){
            $linksQuery->where(function(Builder $query) use($keyword){
                $query->orWhere('title','like',$keyword.'%')->orWhere('link','like',$keyword.'%');
            });
        }
        
        $links=$linksQuery->where('deleted_at',NULL)->paginate(10);

        if($request->hasHeader('search')) {
            return response()->json($links);
        }else{
            return Inertia::render('SocialLinks/SocialLinkList', [
                'links'=>$links,
                'keyword'=>$keyword
            ]);
        }
        
    }

    public function activate(Request $request,string $id): RedirectResponse
    {
        $link=SocialLink::select('id','status')->where('deleted_at',NULL)->find($id);

        if(empty($link)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('social_links');
        }

        $link->status=1-$link->status;
        $link->update();
        $request->session()->flash('message', 'Social Link have been '.($link->status ? 'activated' : 'deactivated').' successfully');
        return redirect()->route('social_links');

    }

    public function delete(Request $request,string $id): RedirectResponse
    {
        $link=SocialLink::select('id','deleted_at')->where('deleted_at',NULL)->find($id);

        if(empty($link)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('social_links');
        }

        $link->deleted_at=Carbon::now();
        $link->update();
        $request->session()->flash('message', 'Social Link have been deleted successfully');
        return redirect()->route('social_links');

    }

    public function create(Request $request): Response
    {
        return Inertia::render('SocialLinks/SocialLinkAdd');
    }

    public function add(SocialLinkUpdateRequest $request)
    {
       
        $data=$request->all();
       
        try{
            SocialLink::create($data);
            $request->session()->flash('message', 'Social Link have been created successfully');
            return redirect()->route('social_links');
        }
        catch (\PDOException $e) {
            die($e->getMessage());
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('social_links');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save social link this time.');
        return redirect()->route('social_links');

    }

    public function edit(Request $request,string $id): Response
    {
        if(empty($id)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('social_links');
        }

        $link=SocialLink::select('id', 'title', 'link', 'icon')->where('deleted_at',NULL)->find($id);

        if(empty($link)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('social_links');
        }
        
        return Inertia::render('SocialLinks/SocialLinkEdit', [
            'link'=>$link,
        ]);
        
    }

    public function update(SocialLinkUpdateRequest $request,string $id)
    {
      
        if(empty($id)){
            $request->session()->flash('message', 'Social Link doesnot exist.');
            return redirect()->route('social_links');
        }

        $link=SocialLink::select('id')->where('deleted_at',NULL)->find($id);

        if(empty($link)){
            $request->session()->flash('message', 'Social Link doesnt exist.');
            return redirect()->route('social_links');
        }

        $data=$request->all();
       
        try{
            $link->update($data);
            $request->session()->flash('message', 'Social Link have been saved successfully');
            return redirect()->route('social_links');
        }
        catch (\PDOException $e) {
            
            $request->session()->flash('message', 'Sorry, We are unable to save Social Link this time.');
            return redirect()->route('social_links.edit',$id);
        }
        $request->session()->flash('message', 'Sorry, We are unable to save Social Link this time.');
        return redirect()->route('social_links.edit',$id);
        

    }
}
