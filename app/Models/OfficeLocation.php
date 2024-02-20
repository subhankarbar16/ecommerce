<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficeLocation extends Model
{

  
    use HasFactory;

    protected $table='office_locations';
    protected $fillable=['street', 'city', 'state', 'zipcode', 'country_id', 'phone','status'];

    public function parent()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }
}