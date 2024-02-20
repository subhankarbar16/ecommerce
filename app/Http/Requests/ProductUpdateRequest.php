<?php

namespace App\Http\Requests;
use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rule =[
            'product_name'=>'required',
            'category_id'=>'required', 
            'product_description'=>'required',
            'product_unit'=>'required',
           'product_variants.*.quantity' => 'required|numeric',
            'product_variants.*.price'=> 'required|numeric',
            'product_variants.*.mrp'=> 'required|numeric',
            
            'product_variants.*.stock'=> 'required|numeric',
            
        ];
        if (empty($this->request->get('id'))) {
            $rule['product_image'] = 'required|extensions:jpg,png,jpeg,gif';
            $rule['product_variants.*.sku']= ['required','distinct',Rule::unique(ProductSize::class)];
        }else{
            if(!empty($_FILES['product_image'])){
                $rule['product_image'] = 'extensions:jpg,png,jpeg,gif';
            }
            $rule['product_variants.*.sku']= ['required','distinct'];
        }
        

        return $rule;
    }

    public function messages()
    {
        return [
            'product_variants.*.quantity.required' => 'Quantity Required',
            'product_variants.*.quantity.numeric' => 'Quantity must be numeric',
            'product_variants.*.price.required' => 'Price Required',
            'product_variants.*.price.numeric' => 'Price must be numeric',
            'product_variants.*.mrp.required' => 'MRP Required',
            'product_variants.*.mrp.numeric' => 'MRP must be numeric',
            'product_variants.*.stock.required' => 'Stock Required',
            'product_variants.*.stock.numeric' => 'Stock must be numeric',
            'product_variants.*.sku.required' => 'Sku Required',
            'product_variants.*.sku.unique' => 'Sku need to be unique',
            'product_variants.*.sku.distinct' => 'Sku need to be unique',
            
        ];
    }
}
