<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SiteSettingUpdateRequest extends FormRequest
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
        return [
            'site_name' => 'required',
            'support_email' => 'required|email',
            'support_phone' => 'required|digits:10',
            'site_logo' => 'sometimes|extensions:jpg,png,jpeg,gif',
            'favicon' => 'sometimes|extensions:jpg,png,jpeg,gif',
            'default_currency'=>'required',
            'footer_copyright'=>'required',
            'footer_short_desc'=>'required',
        ];
    }
}
