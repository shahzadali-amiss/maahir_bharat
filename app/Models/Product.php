<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class Product extends Model
{
    use HasFactory;

    function supplier(){
        return $this->hasOne(Supplier::class, 'role_id', 'role_id');
    }

    function reviews(){
        return $this->hasMany(Review::class, 'product_id', 'id');
    }

    function user(){
        return $this->hasOne(User::class, 'id', 'role_id');
    }
} 
