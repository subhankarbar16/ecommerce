<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;
    protected $table="products";
    protected $fillable = ['product_name', 'category_id','product_image','product_description','status'];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function children()
    {
        return $this->hasMany(ProductSize::class, 'product_id')->whereNull('deleted_at');
    }

    public function active()
    {
        return $this->hasMany(ProductSize::class, 'product_id')->where('status','=','1')->whereNull('deleted_at');
    }

    public function orderdetail()
    {
        return $this->hasMany(OrderDetail::class, 'product_id');
    }

    // public function descendants()
    // {
    //     return $this->children()->with('descendants');
    // }

}

