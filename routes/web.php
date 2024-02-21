<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteSettingsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\BannersController;
use App\Http\Controllers\DiscountsController;
use App\Http\Controllers\OfficeLocationsController;
use App\Http\Controllers\SocialLinksController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/products/{any?}/{slug?}/{key?}', [ProductsController::class, 'shop'])->name('shop');
Route::get('/product-detail/{any?}/{slug?}', [ProductsController::class, 'product_detail'])->name('products.detail');

Route::prefix('admin')->group(function () {

    Route::get('/', function () {
        return redirect()->route('dashboard');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    
    Route::middleware('auth')->group(function () {
        /* Profile */
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
     // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

     /* Site Settings */

        Route::get('/sitesettings', [SiteSettingsController::class, 'index'])->name('sitesettings');
        Route::post('/sitesettings/update', [SiteSettingsController::class, 'update'])->name('sitesettings.update');

        /** Categories */

        Route::get('/categories', [CategoriesController::class, 'index'])->name('categories');
        Route::get('/categories/search/{any?}', [CategoriesController::class, 'index'])->name('categories.search');
        Route::get('/categories/activate/{any?}', [CategoriesController::class, 'activate'])->name('categories.activate');
        Route::get('/categories/edit/{any?}', [CategoriesController::class, 'edit'])->name('categories.edit');
        Route::post('/categories/update/{id}', [CategoriesController::class, 'update'])->name('categories.update');
        Route::get('/categories/create', [CategoriesController::class, 'create'])->name('categories.create');
        Route::post('/categories/add', [CategoriesController::class, 'add'])->name('categories.add');
        

        /** Products */

        Route::get('/products', [ProductsController::class, 'index'])->name('products');
        Route::get('/products/search/{any?}', [ProductsController::class, 'index'])->name('products.search');
        Route::get('/products/activate/{any?}', [ProductsController::class, 'activate'])->name('products.activate');
        Route::get('/products/edit/{any?}', [ProductsController::class, 'edit'])->name('products.edit');
        Route::post('/products/update/{id}', [ProductsController::class, 'update'])->name('products.update');
        Route::get('/products/create', [ProductsController::class, 'create'])->name('products.create');
        Route::post('/products/add', [ProductsController::class, 'add'])->name('products.add');

       /** Office Locations */

       Route::get('/officelocations', [OfficeLocationsController::class, 'index'])->name('officelocations');
       Route::get('/officelocations/search/{any?}', [OfficeLocationsController::class, 'index'])->name('officelocations.search');
       Route::get('/officelocations/activate/{any?}', [OfficeLocationsController::class, 'activate'])->name('officelocations.activate');
       Route::get('/officelocations/edit/{any?}', [OfficeLocationsController::class, 'edit'])->name('officelocations.edit');
       Route::put('/officelocations/update/{any?}', [OfficeLocationsController::class, 'update'])->name('officelocations.update');
       Route::get('/officelocations/create', [OfficeLocationsController::class, 'create'])->name('officelocations.create');
       Route::post('/officelocations/add', [OfficeLocationsController::class, 'add'])->name('officelocations.add');
       Route::get('/officelocations/deleted/{any?}', [OfficeLocationsController::class, 'delete'])->name('officelocations.delete');

       /** Social Links */

       Route::get('/social_links', [SocialLinksController::class, 'index'])->name('social_links');
       Route::get('/social_links/search/{any?}', [SocialLinksController::class, 'index'])->name('social_links.search');
       Route::get('/social_links/activate/{any?}', [SocialLinksController::class, 'activate'])->name('social_links.activate');
       Route::get('/social_links/edit/{any?}', [SocialLinksController::class, 'edit'])->name('social_links.edit');
       Route::put('/social_links/update/{any?}', [SocialLinksController::class, 'update'])->name('social_links.update');
       Route::get('/social_links/create', [SocialLinksController::class, 'create'])->name('social_links.create');
       Route::post('/social_links/add', [SocialLinksController::class, 'add'])->name('social_links.add');
       Route::get('/social_links/deleted/{any?}', [SocialLinksController::class, 'delete'])->name('social_links.delete');

        /** Banners */

        Route::get('/banners', [BannersController::class, 'index'])->name('banners');
        Route::get('/banners/search/{any?}', [BannersController::class, 'index'])->name('banners.search');
        Route::get('/banners/activate/{any?}', [BannersController::class, 'activate'])->name('banners.activate');
        Route::get('/banners/edit/{any?}', [BannersController::class, 'edit'])->name('banners.edit');
        Route::post('/banners/update/{any?}', [BannersController::class, 'update'])->name('banners.update');
        Route::get('/banners/create', [BannersController::class, 'create'])->name('banners.create');
        Route::post('/banners/add', [BannersController::class, 'add'])->name('banners.add');

        /** Users */

        Route::get('/users', [UsersController::class, 'index'])->name('users');
        Route::get('/users/search/{any?}', [UsersController::class, 'index'])->name('users.search');
        Route::get('/users/activate/{any?}', [UsersController::class, 'activate'])->name('users.activate');
        Route::get('/users/edit/{any?}', [UsersController::class, 'edit'])->name('users.edit');
        Route::post('/users/update/{any?}', [UsersController::class, 'update'])->name('users.update');
        Route::get('/users/create', [UsersController::class, 'create'])->name('users.create');
        Route::post('/users/add', [UsersController::class, 'add'])->name('users.add');

        /** Discounts */

        Route::get('/discounts', [DiscountsController::class, 'index'])->name('discounts');
        Route::get('/discounts/search/{any?}', [DiscountsController::class, 'index'])->name('discounts.search');
        Route::get('/discounts/activate/{any?}', [DiscountsController::class, 'activate'])->name('discounts.activate');
        Route::get('/discounts/edit/{any?}', [DiscountsController::class, 'edit'])->name('discounts.edit');
        Route::put('/discounts/update/{any?}', [DiscountsController::class, 'update'])->name('discounts.update');
        Route::get('/discounts/create', [DiscountsController::class, 'create'])->name('discounts.create');
        Route::post('/discounts/add', [DiscountsController::class, 'add'])->name('discounts.add');

        


    });

});

require __DIR__.'/auth.php';
