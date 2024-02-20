<?php

namespace App\Http\Requests;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UserUpdateRequest extends FormRequest
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

        //dd($_FILES['user_image']);
        $rule =[ 
            'first_name'=>'required', 
            'last_name'=>'required', 
            'street'=>'required', 
            'city'=>'required', 
            'state'=>'required', 
            'country_id'=>'required', 
            'zipcode'=>'required|min:5', 
        ];

        if(!empty($_FILES['user_image'])){
           
            $rule['user_image']='extensions:jpg,png,jpeg,gif';
        }

        if (empty($this->request->get('id'))) {
            $rule['password']='required|min:8';
            $rule['confirm_password']='required_with:password_confirmation|same:password';
            $rule['email']=['required','email', Rule::unique(User::class)];
            $rule['phone']=['required','digits:10',Rule::unique(User::class)];
        }else{
           // dd($this->request->get('id'));
            $rule['email']=['required','email', Rule::unique(User::class)->ignore($this->request->get('id'))];
            $rule['phone']=['required','digits:10',Rule::unique(User::class)->ignore($this->request->get('id'))];
            if(!empty($this->request->get('new_password'))) {
                $rule['new_password']='min:8';
                $rule['confirm_password']='required_with:password_confirmation|same:new_password';
            }
        }

        return $rule;
    }
}
