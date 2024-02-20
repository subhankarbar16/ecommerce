<?php

namespace App\Http\Controllers;
use Illuminate\Support\Carbon;
use App\Models\Banner;
use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Contracts\Database\Eloquent\Builder;
use DB;

class WelcomeController extends Controller
{
    public function index(Request $request):Response
    {
        $banners=Banner::select('id','title', 'banner_image','highlight', 'short_description', 'link')
            ->where('status',1)
            ->orderBy('sorting_order')
            ->get();

       // dd(Carbon::now()->subDays(7));

        // $new_arrivals=Product::with('children.unit')->where('status',1)->where('created_at','>', Carbon::now()->subDays(7))->orderBy('created_at','DESC')->limit(8)->get();
        DB::connection()->enableQueryLog();
        $new_arrivals=ProductSize::with(['parent'=>function(Builder $query){
            $query->where(['status' => 1]);
    },'unit'])->where('status',1)->groupBy('product_id')->orderBy('id','DESC')->limit(8)->get();

   // $product_sizes=ProductSize::with(['parent','unit'])->get();
   //dd(DB::getQueryLog(),json_decode(json_encode($new_arrivals),true));
   // dd();


        return Inertia::render('Welcome', [
            'banners'=>$banners,
            'new_arrivals'=>$new_arrivals,
            //'product_sizes'=>$product_sizes,
         ]);
    }
}
