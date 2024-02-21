<?php

namespace App\Http\Requests;

use App\Models\ProductUnit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductUnitUpdateRequest extends FormRequest
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
        if (empty($this->request->get('id'))) {
            $rule['unit_name']=['required',Rule::unique(ProductUnit::class)];
        }else{
            $rule['unit_name']=['required',Rule::unique(ProductUnit::class)->ignore($this->request->get('id'))];
        }
        return $rule;
    }
}
