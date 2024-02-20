<?php
namespace App\Http\Controllers;
use App\Http\Requests\SiteSettingUpdateRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
class SiteSettingsController extends Controller
{
     /**
     * Display the site settings form.
     */
    public function index(Request $request): Response
    {
        $sitesetting=SiteSetting::select('id', 'site_name', 'site_logo', 'favicon', 'support_email', 'support_phone', 'meta_keyword', 'meta_description','default_currency')->first();

        return Inertia::render('SiteSetting', [
            'sitesettings'=>$sitesetting,
        ]);
    }

    public function update(SiteSettingUpdateRequest $request)
    {

        $sitesetting=SiteSetting::select('id')->first();
        
       $data=$request->all();
       
       $site_logo=$request->file('site_logo');
       $favicon=$request->file('favicon');

       unset($data['site_logo']);
       unset($data['favicon']);

       if($site_logo){
            $site_logo_filename=rand().$site_logo->getClientOriginalName();
            $site_logo->move(base_path('/public/images/brands'), $site_logo_filename);
            $data['site_logo']=$site_logo_filename;
       }
       if($favicon){
            $favicon_filename=rand().$favicon->getClientOriginalName();
            $favicon->move(base_path('/public/images/brands'), $favicon_filename);
            $data['favicon']=$favicon_filename;
       }

       
       //dd($data);
       try{
            
            $sitesetting->update($data);
            $request->session()->flash('message', 'Site Settings have been saved successfully');
            return redirect()->route('dashboard');
        }
        catch (\PDOException $e) {
            
           
        }
        $request->session()->flash('message', 'Sorry, We are unable to save Site Settings this time.');
        return redirect()->route('sitesettings');
       
    }
}
