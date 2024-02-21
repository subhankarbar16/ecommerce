<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductUnit extends Model
{
    use HasFactory;
    public $timestamp=true;
    protected $table='product_units';
    protected $fillable = ['unit_name', 'status','deleted_at'];
}
