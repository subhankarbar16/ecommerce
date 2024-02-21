<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table='social_links';
    protected $fillable = ['title', 'link', 'icon', 'status'];
}
