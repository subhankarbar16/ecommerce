<?php

namespace App\Http\Controllers;
use App\Models\Discount;
use App\Models\Product;
use App\Http\Requests\DiscountUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;

class DiscountsController extends Controller
{
   
    public function index(Request $request,string $keyword='')
    {

        if(!empty($keyword)){
            $discounts=Discount::select('type', 'unit',  'coupon_code', 'product_ids', 'total_value','start_date', 'end_date', 'status')
            ->orWhere('coupon_code','like','%'.$keyword.'%')
            ->orWhere('id',$keyword)
            ->orderBy('created_at')
            ->paginate(2);
            
        }else{
            $discounts=Discount::select('type', 'unit',  'coupon_code', 'product_ids', 'total_value','start_date', 'end_date', 'status')
            ->orderBy('created_at')
            ->paginate(2);
        }

        if ($request->hasHeader('search')) {
            return response()->json($discounts);
        }else{
            return Inertia::render('Discounts/DiscountList', [
                'discounts'=>$discounts,
                'keyword'=>$keyword,
            ]);
        }
    }

    public function activate(string $discountId): RedirectResponse
    {
        $discount=Category::select('id','status')->find($discountId);

        if(empty($discount)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('discounts');
        }

        $discount->status=1-$discount->status;
        $discount->update();

        return redirect()->route('discounts');

    }

    public function create(Request $request): Response
    {
        $products=Product::select('id','product_name')->get();
        return Inertia::render('Discounts/DiscountAdd', [
            'products'=>$products,
        ]);
    }

    public function edit(Request $request,string $discountId): Response
    {
        if(empty($discountId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('discounts');
        }

        $discount=Discount::select('id','type', 'unit', 'coupon_code', 'product_ids', 'total_value','start_date', 'end_date', 'status')
        ->find($discountId);

        if(empty($discount)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('discounts');
        }

        $products=Product::select('id','product_name')->get();
        
        return Inertia::render('Discounts/DiscountEdit', [
            'discount'=>$discount,
            'products'=>$products,
        ]);
        

    }


}
