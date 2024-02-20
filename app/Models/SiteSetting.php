<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $table='site_settings';
    protected $fillable = ['site_name', 'site_logo', 'favicon', 'support_email', 'support_phone', 'meta_keyword', 'meta_description','footer_copyright','footer_short_desc','default_currency'];
}
