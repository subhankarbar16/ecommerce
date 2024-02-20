<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Iksaku\Laravel\MassUpdate\MassUpdatable;

class ProductSize extends Model
{
    use HasFactory, MassUpdatable;

    protected $table='product_sizes';
    protected $fillable = ['product_id', 'product_unit_id', 'quantity', 'status', 'price'];

    public function parent()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function unit()
    {
        return $this->belongsTo(ProductUnit::class, 'product_unit_id');
    }
    
}
