<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class BannerUpdateRequest extends FormRequest
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
            'title'=>'required',
            'highlight'=>'required',
            'short_description'=>'required', 
            'link'=>'required|url:http,https', 
            'sorting_order'=>'required|numeric',  
        ];
        if (empty($this->request->get('id'))) {
            $rule['banner_image'] = 'required|extensions:jpg,png,jpeg,gif';
        }else{
            if(!empty($_FILES['banner_image'])){
                $rule['banner_image'] = 'extensions:jpg,png,jpeg,gif';
            }
        }

        return $rule;
    }
}
