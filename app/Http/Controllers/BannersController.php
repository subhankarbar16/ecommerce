<?php

namespace App\Http\Controllers;
use App\Models\Banner;
use App\Http\Requests\BannerUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;

class BannersController extends Controller
{
    public function index(Request $request,string $keyword='')
    {
        if(!empty($keyword)){
            $banners=Banner::select('id','title','highlight', 'banner_image', 'short_description', 'link', 'status', 'sorting_order')
            ->orWhere('title','like',$keyword.'%')
            ->orWhere('id',$keyword)
            ->orWhere('short_description','like','%'.$keyword.'%')
            ->orWhere('link', 'like','%'.$keyword.'%')
            ->orderBy('created_at')
            ->paginate(2);
        }else{
            $banners=Banner::select('id','title', 'banner_image','highlight', 'short_description', 'link', 'status', 'sorting_order')
            ->orderBy('sorting_order')
            ->paginate(2);
        }
       
        if ($request->hasHeader('search')) {
            return response()->json($banners);
        }else{
            return Inertia::render('Banners/BannerList', [
                'banners'=>$banners,
                'keyword'=>$keyword,
             ]);
        }
    }

    public function activate(string $bannerId): RedirectResponse
    {
        if(empty($bannerId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('banners');
        }

        $banner=Banner::select('id','status')->find($bannerId);

        if(empty($banner)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('banners');
        }

        $banner->status=1-$banner->status;
        $banner->update();

        return redirect()->route('banners');

    }

    public function create(Request $request): Response
    {
        $bannersCount=Banner::select('id')->count();
       // dd($bannersCount);
        $sorting_orders=range(1,($bannersCount+1));
        
       // dd($sorting_orders);
        return Inertia::render('Banners/BannerAdd', [
            'sorting_orders'=>$sorting_orders,
        ]);
    }

    public function add(BannerUpdateRequest $request)
    {
        $data=$request->all();

        $bannersCount=Banner::select('id')->count();
        $currentOrder=$bannersCount+1;

        $banner_image=$request->file('banner_image');
        unset($data['banner_image']);
        $banner_image_filename=rand().$banner_image->getClientOriginalName();
        $banner_image->move(base_path('/public/images/banners'), $banner_image_filename);
        $data['banner_image']=$banner_image_filename;

        DB::beginTransaction();
        try{
            Banner::create($data);
            Banner::where(['sorting_order'=> $data['sorting_order']])->update(['sorting_order' => $currentOrder]);
            DB::commit();
            return redirect()->route('banners');
        }
        catch (\PDOException $e) {
            DB::rollback();
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('products');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save category this time.');
        return redirect()->route('products');
        

    }

    public function edit(Request $request,string $bannerId): Response
    {
        if(empty($bannerId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('banners');
        }

        $banner=Banner::select('id', 'title','highlight', 'banner_image', 'short_description', 'link', 'sorting_order')->find($bannerId);
       // dd($banner);
        if(empty($banner)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('banners');
        }

        $bannersCount=Banner::select('id')->count();
       // dd($bannersCount);
        $sorting_orders=range(1,$bannersCount);
        
       // dd($sorting_orders);
        return Inertia::render('Banners/BannerEdit', [
            'sorting_orders'=>$sorting_orders,
            'banner'=>$banner,
        ]);
    }

    public function update(BannerUpdateRequest $request,string $bannerId)
    {
        if(empty($bannerId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('banners');
        }
        
        $banner=Banner::select('id','banner_image','sorting_order')->find($bannerId);
       

        if(empty($banner)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('banners');
        }

        $currentOrder=$banner['sorting_order'];
        
        $data=$request->all();
        $banner_image=$request->file('banner_image');
        if(!empty($banner_image)){
            unset($data['banner_image']);
            $banner_image_filename=rand().$banner_image->getClientOriginalName();
            $banner_image->move(base_path('/public/images/banners'), $banner_image_filename);
            unlink(base_path('/public/images/banners/'.$banner->banner_image));
            $data['banner_image']=$banner_image_filename;
        }else{
            unset($data['banner_image']);
        }

        DB::beginTransaction();
        try{
            Banner::where(['sorting_order'=> $data['sorting_order']])->update(['sorting_order' => $currentOrder]);
            $banner->update($data);
            
            DB::commit();
            $request->session()->flash('message', 'Banner have been saved successfully');
            return redirect()->route('banners');
        }
        catch (\PDOException $e) {
            DB::rollback();
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('banners');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save banner this time.');
        return redirect()->route('banners');
        

    }
}
