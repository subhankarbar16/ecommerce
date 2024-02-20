<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $table="countries";

    public function childrenOffice()
    {
        return $this->hasMany(OfficeLocation::class, 'country_id');
    }

    public function childrenUser()
    {
        return $this->hasMany(User::class, 'country_id');
    }
}
