<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{

    public function getCartItems(Request $request){
        $cart = \App\Models\Order::visitor($request)->with('product')->where('is_in_cart', true)->get();
        $data = [];
        foreach($cart as $item){
            $data[] = $this->cartResource($item, $item->product);
        }

        return response()->json(['status' => true, 'product' => $data]);
    }

    public function addItemIntoCart(Request $request){
        // dd($request->all());

        // CHECK ALREADY ADDED OR NOT
        if(\App\Models\Order::where('product_id', $request->pid)->where('is_in_cart', true)->count() > 0)
            return response()->json(['status' => true, 'product' => []]);

        // GET PRODUCT
        $product = \App\Models\Product::find($request->pid);

        $cart = new \App\Models\Order();
        $cart->product_id = $product->id;
        $cart->final_price = $product->offer_price;
        $cart->quantity = $request->qty;
        $cart->user_id = $request->user_id ?? null;
        $cart->visitor_id = $request->visitor_id;

        if($cart->save())
            return response()->json(['status' => true, 'product' => $this->cartResource($cart, $product)]);

        return response()->json(['status' => false]);
    }

    private function cartResource($cart, $product){
        return [
            'id' => $cart->id,
            'name' => ucwords($product->name),
            'quantity' => $cart->quantity,
            'price' => $cart->final_price,
            'image' => $product->image,
        ];
    }
}
