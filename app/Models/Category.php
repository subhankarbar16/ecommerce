<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamp=true;
    protected $table="categories";
    protected $fillable = ['category_name','category_image', 'status', 'parent_id','deleted_at','incl_front_section', 'incl_header', 'incl_footer'];

    
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function childrenProduct()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

}
