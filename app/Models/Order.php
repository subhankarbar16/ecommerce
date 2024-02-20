<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table="orders";
    protected $fillable=['user_id','order_total', 'payment_method', 'sub_total', 'discount_total', 'discount_id'];

    public function discount()
    {
        return $this->belongsTo(Dicount::class, 'discount_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function detail()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }

}
