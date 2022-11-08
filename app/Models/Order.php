<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function scopeVisitor($query, $request)
    {
        return $query->where('user_id', $request->user_id ?? \Auth::user()->id ?? null)->orWhere('visitor_id', $request->visitor_id ?? \Cookie::get('visitor_id'));
    }

    public function product(){
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
