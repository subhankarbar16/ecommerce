<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table="order_details";
    protected $fillable=['order_id', 'product_id', 'discount_id', 'product_quantity', 'subtotal_amount', 'total_amount', 'discount_amount'];

    public function discount()
    {
        return $this->belongsTo(Dicount::class, 'discount_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
