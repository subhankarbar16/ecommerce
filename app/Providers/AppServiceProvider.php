<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\SiteSetting;
use App\Models\Category;
use App\Models\SocialLink;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $site=SiteSetting::first();
        
       
        $categories=Category::with('children')->whereHas('children', function ($query) {
            $query->where('status','=','1');
        })->where(['status'=>1,'parent_id'=>NULL])->get();
        $social_links=SocialLink::where(['status'=>1,'deleted_at'=>NULL])->get();
       // dd($categories);
        \Config::set(['categories'=>$categories,'site'=> $site,'social_links'=>$social_links]);
       // \Config::set('site', $site);

       

    }
}
