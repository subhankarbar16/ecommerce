<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Http\Requests\CategoryUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DB;

class CategoriesController extends Controller
{
    public function index(Request $request,string $keyword='')
    {

        if(!empty($keyword)){
            $categories=Category::select('id','category_name','category_image','parent_id','status')->with('parent')->orWhere('category_name','like','%'.$keyword.'%')->orWhere('id',$keyword)->orderBy('created_at')->paginate(10);
            
        }else{
            $categories=Category::select('id','category_name','category_image','parent_id','status')
            ->with('parent')->orderBy('created_at')->paginate(10);
        }

        if ($request->hasHeader('search')) {
            return response()->json($categories);
        }else{
            return Inertia::render('Categories/CategoryList', [
                'categories'=>$categories,
                'keyword'=>$keyword,
            ]);
        }

       
        
    }

    public function activate(string $categoryId): RedirectResponse
    {
        $category=Category::select('id','status')->find($categoryId);

        if(empty($category)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('categories');
        }

        $category->status=1-$category->status;
        $category->update();

        return redirect()->route('categories');

    }

    public function create(Request $request): Response
    {
        $categories=Category::select('id','category_name')->where('parent_id',NULL)->get();
        return Inertia::render('Categories/CategoryAdd', [
            'categories'=>$categories,
        ]);
    }

    public function add(CategoryUpdateRequest $request)
    {
        $data=$request->all();

        $categoryExist=Category::select('id')->where('category_name',$data['category_name'])->first();

        if(!empty($categoryExist)){
            $request->session()->flash('message', 'Category already Exist');
            return redirect()->route('categories.create');
        }

        if(!empty($data['parent_id'])){

            $parent_category=Category::select('id')->where('id',$data['parent_id'])->first();

            if(empty($parent_category)){
                $request->session()->flash('message', 'Invalid Parent Category');
                return redirect()->route('categories');
            }
        }

        $category_image=$request->file('category_image');
        unset($data['category_image']);
        $category_image_filename=rand().$category_image->getClientOriginalName();
        $category_image->move(base_path('/public/images/categories'), $category_image_filename);
        $data['category_image']=$category_image_filename;
       
        try{
            Category::create($data);
            $request->session()->flash('message', 'Category have been created successfully');
            return redirect()->route('categories');
        }
        catch (\PDOException $e) {
            
            $request->session()->flash('message', $e->getMessage());
            return redirect()->route('categories');
        }

        $request->session()->flash('message', 'Sorry, We are unable to save category this time.');
        return redirect()->route('categories');
        

    }

    public function edit(Request $request,string $categoryId)
    {
        if(empty($categoryId)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('categories');
        }

        $category=Category::select('id','category_name','category_image','parent_id')->find($categoryId);

        if(empty($category)){
            $request->session()->flash('message', 'Invalid Request.');
            return redirect()->route('categories');
        }

        $categories=Category::select('id','category_name')->where('parent_id',NULL)->get();
        
        return Inertia::render('Categories/CategoryEdit', [
            'category'=>$category,
            'categories'=>$categories,
        ]);
        

    }

    public function update(CategoryUpdateRequest $request,string $categoryId)
    {
      
        if(empty($categoryId)){
            $request->session()->flash('message', 'Category doesnt exist.');
            return redirect()->route('categories');
        }

        $category=Category::select('id','category_image')->find($categoryId);

        if(empty($category)){
            $request->session()->flash('message', 'Category doesnt exist.');
            return redirect()->route('categories');
        }

        $data=$request->all();

        $categoryExist=Category::select('id')->where('category_name',$data['category_name'])->where('id','!=',$categoryId)->first();

        if(!empty($categoryExist)){
            $request->session()->flash('message', 'Category already exist.');
            return redirect()->route('categories.edit',$categoryId);
        }

        // if($data['parent_id']){

        //     $parent_category=Category::select('id')->where('id','!=',$categoryId)->where('parent_id','!=',$categoryId)->where('id',$data['parent_id'])->first();

        //     if(empty($parent_category)){
        //         $request->session()->flash('message', 'Invalid Parent Category');
        //         return redirect()->route('categories.edit',$categoryId);
        //     }
        // }

        $category_image=$request->file('category_image');
        if(!empty($category_image)){
            unset($data['category_image']);
            $category_image_filename=rand().$category_image->getClientOriginalName();
            $category_image->move(base_path('/public/images/categories'), $category_image_filename);
            unlink(base_path('/public/images/categories/'.$category->category_image));
            $data['category_image']=$category_image_filename;
        }else{
            unset($data['category_image']);
        }
       
        try{
            $category->update($data);
            $request->session()->flash('message', 'Category have been saved successfully');
            return redirect()->route('categories');
        }
        catch (\PDOException $e) {
            
            $request->session()->flash('message', 'Sorry, We are unable to save category this time.');
            return redirect()->route('categories.edit',$categoryId);
        }
        $request->session()->flash('message', 'Sorry, We are unable to save category this time.');
        return redirect()->route('categories.edit',$categoryId);
        

    }

    
}
