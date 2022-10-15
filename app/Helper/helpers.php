<?php


use Illuminate\Support\Facades\Auth;  
use App\Models\User;
use App\Models\Category;
use App\Models\Image;
use App\Models\Order;
use App\Models\City;
use App\Models\State;
use App\Models\Product; 
use App\Models\Address;
use App\Models\Attribute;
use App\Models\Attribute_value; 
use App\Models\BannerAds;
use App\Models\Supplier;
use Carbon\Carbon;



function getUser($mobile, $role){
	$user=User::where('mobile', $mobile)->where('role', $role)->get()->toArray();
    return $user;
}

function getUserById($id){
    $user=User::find($id);
    if($user){
        return $user;    
    }
}

function getCategory($id){
	$category=Category::find($id);
    return $category;
}

function getProduct($id){
    $product=Product::find($id);
    return $product;
}

function getAttributeValueName($id){
    $attr=Attribute_value::find($id);
    if($attr){
        return $attr->value;    
    }
}
function getAttribute($id){
    $attr=Attribute::find($id);
    if($attr){
        return $attr;    
    }
}

function getPrimaryAdBanners(){
    $banners=BannerAds::where(['type'=>'Primary', 'status'=>true])->get();
    if(!$banners->isEmpty()){
        return $banners;    
    }else{
        return [];
    }
    
}

function getSupplierDetails(){
    
    return Supplier::where('role_id',Auth::user()->id)->first();
}

function getSupplierById($id){
    return Supplier::where('role_id', $id)->first();
}

function getSecondaryAdBanners(){
    $banners=BannerAds::where(['type'=>'Secondary', 'status'=>true])->get();
    if(!$banners->isEmpty()){
        return $banners;    
    }else{
        return [];
    }
    
}

function moveProductImage($file, $name){
	$destinationPath = public_path( 'product_images' );
    $image = $file->$name;
    $fileName = rand(10000, 55555).time().'.'.$image->clientExtension();
    $image->move( $destinationPath, $fileName );
    return $fileName;
}

function replaceProductImage($file, $name, $oldImage){
	$destinationPath = public_path( '/product_images' );
    $image = $file->$name;
    $fileName = rand(11111, 99999999).time().'.'.$image->clientExtension();
    $image->move( $destinationPath, $fileName );
    unlink(public_path('product_images/'.$oldImage));
    return $fileName;
}

function isImageExist($type_id, $priority){
	$image=Image::where('type_id', $type_id)->where('priority', $priority)->where('status', true)->get();
    return $image;
}

function getImage($type, $type_id, $priority, $uid){
    $image=Image::where([ 'type_id' => $type_id, 'priority' => $priority, 'status' => true, 'type' => $type, 'role_id' => $uid])->get();
    if(!$image->isEmpty()){
        return $image[0];
    }
}

function getCartQuantity(){
    $quantities=Order::where([ 'user_id' => Auth::user()->id, 'is_in_cart' => true])->get();
    
    $i=0;
    if($quantities->isEmpty()){
        return $i;
    }else{
        foreach ($quantities as $key => $quantity) {
            $i=$i+$quantity->quantity;
        }
        return $i;
    }
}

function getCartProductQuantity($pid){
    $quantities=Order::where([ 'user_id' => Auth::user()->id, 'is_in_cart' => true, 'product_id' => $pid])->get();
    if(!$quantities->isEmpty())
        $i=$quantities[0]->quantity;

        return $i;
    
}

function getCartProductAttributes($pid){
    // dd(session()->get('supplier.id'));
    // dd(session()->all());   
    $order=Order::where([ 'user_id' => Auth::user()->id, 'is_in_cart' => true, 'product_id' => $pid])->get();
    $i=[];
    if(!$order->isEmpty()){
        $i=json_decode($order[0]->attributes);
    }
    return $i;
    
}


function getCartProducts(){
    $quantities=Order::where([ 'user_id' => Auth::user()->id, 'is_in_cart' => true])->get();
    if(!$quantities->isEmpty()){
        foreach ($quantities as $key => $quantity) {
            $products[$key]=Product::find($quantity->product_id);
        }
        return $products;
    }else{
        return [];
    }
}

function getCartSubTotal(){
    $orders=Order::where([ 'user_id' => Auth::user()->id, 'is_in_cart' => true])->get();
    
    $i=0;
    if($orders->isEmpty()){
        return $i;
    }else{
        foreach ($orders as $key => $order) {
            $i=$i+$order->final_price*$order->quantity;
        }
        return $i;
    }
}

function getShippingAddress(){
    $address=Address::where('role_id', Auth::user()->id)->first();
    if($address){
        return $address;
    }else{
        return false;
    }
}

function getProductSupplier($pid){
    $product=Product::find($pid);
    if($product){
        $supplier=User::find($product->role_id);
        if($supplier){
            return $supplier;
        }else{
            return false;
        }
    }    
}

function getOtherProductImages($pid){
    $images=Image::where([ 'type' => 'p', 'type_id' => $pid ])->orderby('priority')->get();
    return $images;
    
}

function setCartProductQuantity($pid, $quantity){
    $order=Order::where([ 'product_id' => $pid, 'is_in_cart' => true ])->first();
    $order->quantity=$quantity;
    if($order->save()){
        return true;
    }else{
        return false;
    }
}

function getGrandCategoryIcon($cid){
    $category=Category::where([ 'category_type' => 1, 'id' => $cid ])->first();
    if($category){
        return $category->icon;
    }else{
        return [];
    }
}

function getCityName($cid){
    $city=City::find($cid);
    if($city){
        return $city->city;
    }else{
        return [];
    }
}

function getStateName($sid){
    $state=State::find($sid);
    if($state){
        return $state->name;
    }else{
        return [];
    }
}

function getOrders(){
    $orders=Order::where(['user_id' => Auth::user()->id, 'is_in_cart' => false])->orderBy('id', 'desc')->paginate(10);
    if(!$orders->isEmpty()){
        return $orders;
    }else{
        return [];
    }
}

function getAllOrders(){
    $orders=Order::where(['user_id' => Auth::user()->id, 'is_in_cart' => false])->get();
    if(!$orders->isEmpty()){
        return $orders;
    }else{
        return [];
    }   
}

function getSupplierProducts(){
    $products=Product::where(['role_id'=>Auth::user()->id, 'status' => true])->orderby('id', 'desc')->get();
    // dd($products);
    return $products;
}

function getSupplierOrders($type){
    $products=getSupplierProducts(); 
    $ids=[];
    foreach ($products as $key => $value) {
        $ids[$key]=$value->id;
    }
    // dd(json_encode($ids));
    $orders=Order::whereIn('product_id',$ids)->where(['is_in_cart'=>false, 'status'=>$type])->orderBy('id', 'desc')->paginate(10);
    return $orders;  
}

function getSupplierOrdersQuantity($type=null){
    $products=getSupplierProducts(); 
    $ids=[]; 
    foreach ($products as $key => $value) {
        $ids[$key]=$value->id;
    }
    // dd(json_encode($ids));
    if(is_null($type)){
        $orders=Order::whereIn('product_id',$ids)->where(['is_in_cart'=>false])->get();
    }else{
        $orders=Order::whereIn('product_id',$ids)->where(['is_in_cart'=>false, 'status'=>$type])->get();
    }
    return count($orders);   
}

function getProductAttributes($pid){
    $product_attributes=[];
    // dd(Attribute::where('product_id',$pid)->get());
    $temp = \DB::select("SELECT * FROM `product_attributes` as pa INNER JOIN product_attribute_values as av on pa.attribute_value_id = av.id INNER JOIN attributes as a on a.id = av.attribute_id where pa.product_id = $pid AND av.is_verified = 1 AND av.status = 1");
    // dd($temp);
    if(!is_null($temp)){
        foreach ($temp as $attribute) {
            $product_attributes[$attribute->name][] = $attribute;
        }
    }
    
    return $product_attributes;
}

// function getToday($type=null){
//     $orders = Order::whereDate('created_at',Carbon::today());//->where('user_id', session()->get('supplier.id'));
//     // dd( session()->all());//$orders->get());
//     if(!is_null($type)){
//         $orders = $orders->where('status', $type)->get();
//         $orders->
//         dd($orders);
//         return $orders->count();
//     }

// }

function getToday($type){
    $products=getSupplierProducts(); 
    $ids=[];
    foreach ($products as $key => $value) {
        $ids[$key]=$value->id;
    }
    // dd(json_encode($ids));
    $orders=Order::whereIn('product_id',$ids)->where(['is_in_cart'=>false, 'status'=>$type])->whereDate('created_at',Carbon::today())->orderBy('id', 'desc')->paginate(10);
    // dd($orders);

    return $orders;  
}

function getSupplierEarning(){
    $products=getSupplierProducts(); 
    $ids=[];
    foreach ($products as $key => $value) {
        $ids[$key]=$value->id;
    }
    // dd(json_encode($ids));
    $orders=Order::whereIn('product_id',$ids)->where(['is_in_cart'=>false, 'status'=>'delivered'])->get();
    $ern  = 0;
    if(!$orders->isEmpty()){
        foreach ($orders as $key => $order) {
            $ern += $order->final_price * $order->quantity;
        }
    }
    // dd($orders);
    return $ern;  
}




