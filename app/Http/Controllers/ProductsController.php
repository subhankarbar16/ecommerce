<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductSize;
use App\Models\ProductUnit;
use App\Http\Requests\ProductUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;


class ProductsController extends Controller
{
    public function index(Request $request,string $keyword='')
    {
        $productQuery=Product::query();
        
        $productQuery->with(['parent'=>function(Builder $query){
            $query->select('id','category_name');
        },'children.unit'])->select('id','product_name','category_id','product_image','status')->where('deleted_at',NULL);

        if(!empty($keyword)){
            DB::connection()->enableQueryLog();
            $productsize=ProductSize::select('id','product_id')->orWhere('sku','LIKE',$keyword.'%')->orWhere('price','LIKE',$keyword)->orWhere('mrp','LIKE',$keyword)->get();
            //dd(DB::getQueryLog(),$productsize);
            $productIds=!empty($productsize) ? array_column(json_decode(json_encode($productsize),true),'product_id') : array(0);
            //dd($productIds);
            $productQuery->where(function(Builder $query) use($keyword,$productIds){
                $query->orWhere('product_name','like',$keyword.'%')
                ->orWhere('id',$keyword)
                ->orWhereIn('id',$productIds);
                
            });
        }
        

        $products=$productQuery->orderBy('created_at')->with('parent')->paginate(10);
       
        if ($request->hasHeader('search')) {
            return response()->json($products);
        }else{
            return Inertia::render('Products/ProductList', [
                'products'=>$products,
                'keyword'=>$keyword,
             ]);
        }
    }

    public function activate(string $productId)
    {
        if(empty($productId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }

        $product=Product::select('id','status')->where('deleted_at',NULL)->find($productId);

        if(empty($product)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }

        $product->status=1-$product->status;
        $product->update();

        return redirect()->route('products');

    }

    public function delete(string $productId)
    {
        if(empty($productId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }

        $product=Product::select('id','deleted_at')->where('deleted_at',NULL)->find($productId);

        if(empty($product)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }

        $product->deleted_at=Carbon::now();
        $product->update();

        return redirect()->route('products');

    }

    public function create(Request $request): Response
    {
        $categories=Category::select('id','category_name')->where('parent_id','!=',NULL)->get();
        $product_units=ProductUnit::select('id','unit_name')->get();

        return Inertia::render('Products/ProductAdd', [
            'categories'=>$categories,
            'product_units'=>$product_units,
        ]);
    }

    public function add(ProductUpdateRequest $request)
    {
        $data=$request->all();

        //dd($data);

        if(!empty($data['category_id'])){

            $parent_category=Category::select('id')->where('id',$data['category_id'])->first();

            if(empty($parent_category)){
                $request->session()->flash('message', 'Invalid Product Category');
                return redirect()->route('products.add');
            }
        }

        $product_image=$request->file('product_image');
        unset($data['product_image']);
        $product_image_filename=rand().$product_image->getClientOriginalName();
        $product_image->move(base_path('/public/images/products'), $product_image_filename);
        $data['product_image']=$product_image_filename;
        $data['status']=1;
        try{
            DB::beginTransaction();
            $data['is_featured']=$data['is_featured'] ? 1 : 0 ;
            $product=Product::create($data);
            if($product->id){
                $variants=array_map(function($item) use ($product,$data){
                    $item['product_id']=$product->id;
                    $item['product_unit_id']=$data['product_unit'];
                    $item['created_at']=date('Y-m-d h:i:s');
                    $item['updated_at']=date('Y-m-d h:i:s');
                    return $item;
                },$data['product_variants']);
                
                ProductSize::insert($variants);
            DB::commit();
           }
            $request->session()->flash('message', 'Product have been created successfully');
            return redirect()->route('products');
        }

        catch (\PDOException $e) {
            DB::rollBack();
            die($e->getMessage());
            //$request->session()->flash('message', $e->getMessage());
            //return redirect()->route('products');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save category this time.');
        return redirect()->route('products');
        

    }

    public function Edit(Request $request,string $productId): Response
    {
        if(empty($productId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }

        $product=Product::with('children.unit')->select('id', 'product_name', 'product_description', 'category_id', 'product_image','is_featured')->find($productId);
        

        if(empty($product)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }

        $categories=Category::select('id','category_name')->where('parent_id','!=',NULL)->get();
        $product_units=ProductUnit::select('id','unit_name')->get();

        return Inertia::render('Products/ProductEdit', [
            'categories'=>$categories,
            'product_units'=>$product_units,
            'product'=>$product,
        ]);
    }

    public function update(ProductUpdateRequest $request,string $productId)
    {
        if(empty($productId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }
        
        $product=Product::with('children')->select('id','product_image')->find($productId);
        $childrenIds=array_column(json_decode(json_encode($product->children),true),'id');
        

       
        if(empty($product)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('products');
        }
        
        $data=$request->all();

        if(!empty($data['category_id'])){

            $parent_category=Category::select('id')->where('id',$data['category_id'])->first();

            if(empty($parent_category)){
                $request->session()->flash('message', 'Invalid Product Category');
                return redirect()->route('products.edit',$productId);
            }
        }
        $product_image=$request->file('product_image');
        if(!empty($product_image)){
            unset($data['product_image']);
            $product_image_filename=rand().$product_image->getClientOriginalName();
            $product_image->move(base_path('/public/images/products'), $product_image_filename);
            unlink(base_path('/public/images/products/'.$product->product_image));
            $data['product_image']=$product_image_filename;
        }else{
            unset($data['product_image']);
        }

       
        //dd($data);

        try{
            DB::beginTransaction();
            $data['is_featured']=$data['is_featured'] ? 1 : 0 ;
            $product->update($data);
            $variants=array_map(function($item) use ($productId,$data){
                if(!empty($item['id'])){
                    $item['product_id']=$productId;
                    $item['product_unit_id']=$data['product_unit'];
                    $item['updated_at']=date('Y-m-d h:i:s');
                
                    unset($item['unit']);
                    unset($item['created_at']);
                    return $item;
                }
            },$data['product_variants']);

            $variantsToInsert=array_map(function($item) use ($productId,$data){
               
                if(empty($item['id'])){
                    $item['product_id']=$productId;
                    $item['product_unit_id']=$data['product_unit'];
                    $item['updated_at']=date('Y-m-d h:i:s');
                    $item['created_at']=date('Y-m-d h:i:s');
                    return $item;
                }
            },$data['product_variants']);

           // dd(array_filter($variants),array_filter($variantsToInsert));
            
            $requestedChilIds=array_column(array_filter($variants),'id');
            $removedChild=array_diff($childrenIds, $requestedChilIds);

            $deletedChild=array_map(function($item){
                return ['id'=>$item,'updated_at'=>date('Y-m-d h:i:s'),'deleted_at'=>date('Y-m-d h:i:s')];
            },$removedChild);

           
            ProductSize::massUpdate(array_filter($variants));
            ProductSize::massUpdate(array_filter($deletedChild));
            ProductSize::insert(array_filter($variantsToInsert));
            DB::commit();
            $request->session()->flash('message', 'Product have been saved successfully');
            return redirect()->route('products');
        }
        catch (\PDOException $e) {
            DB::rollBack();
            die($e->getMessage());
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('products');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save product this time.');
        return redirect()->route('products');

    }

    public function shop(Request $request,string $category_name=null,string $size=null,string $keyword=null)
    {
        DB::connection()->enableQueryLog();
        $category_name=trim($category_name)=='all' ? '' : trim(str_replace('-',' ',$category_name));
        $size=trim($size)=='all' ? '' : trim($size);
        $keyword=trim($keyword) ? trim($keyword) : '' ;
        $product_sizes=ProductSize::with('unit')->select(['quantity','product_unit_id'])->where('deleted_at',NULL)->where('status',1)->groupBy(['quantity','product_unit_id'])->get();

        $productSizequery = ProductSize::query();
        $parentQuery=Product::query();
        $unitQuery=ProductUnit::query();
        $productSizequery->where(['status' => 1]);
        $parentQuery->where(['status' => 1]);

        if(!empty($category_name)){
            $category=Category::with('children')->where(['status'=>1,'category_name'=>$category_name])->first();
            $cat_ids=[$category->id];
            $child=json_decode(json_encode($category->children),true);
            if(!empty($child)){
                $cat_ids=array_column($child,'id');
            }
            $productIds=Product::select('id')->whereIn('category_id',$cat_ids)->where('status',1)->get();
            $productIds=!empty($productIds) ? array_column(json_decode(json_encode($productIds),true),'id') : array(0);
            $productSizequery->whereIn('product_id',$productIds);
        }

        if(!empty($size)){
            $sizeEx=explode('-',trim($size));
            $quantity=$sizeEx[0];
            unset($sizeEx[0]);
            $unit=implode(' ',$sizeEx);
            $unitQuery->where(['unit_name' => $unit]);
            $productSizequery->where('quantity',$quantity);
        }

        if(!empty($keyword)){
            $productIds2=Product::where('product_name','LIKE','%'.$keyword.'%')->get();
           // dd($productIds2);
            $productIds2=!empty($productIds2) ? array_column(json_decode(json_encode($productIds2),true),'id') : array(0);
            //dd($productIds2);
            $productSizequery->whereIn('product_id',$productIds2);
        }

        $products=$productSizequery->with(['unit'=>function(Builder $query) use ($unitQuery){
            $query=$unitQuery;
        },'parent'=>function(Builder $query) use ($parentQuery){
            $query=$parentQuery;
         }])->paginate(9);

         if ($request->hasHeader('search')) {
            return response()->json($products);
        }else{
            return Inertia::render('Products/Shop', [
                'products'=>$products,
                'category_name'=>$category_name,
                'size'=>$size,
                'keyword'=>$keyword,
                'product_sizes'=>$product_sizes,
            ]);
         }
    }

    public function product_detail(Request $request,string $product_name, string $product_sku)
    {
        $productsize=ProductSize::with(['parent.children.unit'])->where(['status'=>1,'sku'=>$product_sku])->first();
        if(empty($productsize)){
            $request->session()->flash('message', 'Invalid Product');
            return redirect()->route('shop');
        }

        $new_arrivals=ProductSize::with(['parent'=>function(Builder $query){
            $query->where(['status' => 1]);
    },'unit'])->where('status',1)->groupBy('product_id')->orderBy('id','DESC')->limit(4)->get();
       // dd($new_arrivals);
        return Inertia::render('Products/ProductDetail', [
            'product'=>$productsize,
            'new_arrivals'=>$new_arrivals,
        ]);
    }
}
