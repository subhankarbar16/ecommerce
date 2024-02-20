<?php

namespace App\Http\Requests;
use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryUpdateRequest extends FormRequest
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
        $rules =[
            'parent_id' => 'sometimes',
        ];

        if(empty($this->request->get('id'))){
            $rules['category_name'] = ['required',Rule::unique(Category::class)];
            $rules['category_image'] = 'required|extensions:jpg,png,jpeg,gif';
        }else{
            $rules['category_name'] = ['required',Rule::unique(Category::class)->ignore($this->request->get('id'))];

            if(!empty($_FILES['category_image'])){
               
                $rules['category_image'] = 'extensions:jpg,png,jpeg,gif';
            }
        }
        

        return $rules;
    }
}
