<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $table="discounts";
    protected $fillable=['type', 'unit', 'coupon_code', 'product_ids', 'total_value','start_date', 'end_date', 'status'];

    public function orderdetail()
    {
        return $this->hasMany(OrderDetail::class, 'discount_id');
    }

    public function order()
    {
        return $this->hasMany(Order::class, 'discount_id');
    }
}
