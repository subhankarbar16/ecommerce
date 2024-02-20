<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $table='banners';
    protected $fillable=['title','banner_image','highlight','short_description', 'link', 'status', 'sorting_order'];

}
