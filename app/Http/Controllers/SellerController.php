<?php

namespace App\Http\Controllers;
 
use Illuminate\Http\Request; 
use App\Models\Category; 
use App\Models\Product;  
use App\Models\Image; 
use App\Models\State; 
use App\Models\Supplier; 
use App\Models\Order; 
use App\Models\User;  
use App\Models\Bank; 
use App\Models\City; 
use App\Models\Address;   
use App\Models\Attribute; 
use App\Models\Attribute_value; 
use App\Models\Product_attribute;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator; 
// use App\Models\ProductAttributeValue; 
use Session;
use Auth;

class SellerController extends Controller 
{
	public function __construct()
    {
    }

    public function index(Request $request){

        // GET STORE DETAILS IF NOT EXIST
        if(Supplier::where('role_id', Auth::user()->id)->count() == 0)
            return $this->account($request);

    	return view('seller.dashboard');
    }

    public function logout(Request $request){
        Session::flush();
        return redirect()->route('guest-home');
    }

    public function uploadType(Request $request){
        return view('seller.upload-type');
    }

    public function chooseCategory(Request $request, $type=null){
    	if($request->isMethod('get')){
	    		$data['grands']= Category::with('childs')->where('category_type', 1)->where('status', true)->get();
		    if($data['grands']){	
		    	if($type=='single'){
		    		return view('seller.choose-category', $data);
		    	// }elseif($type=='bulk') {
		    	// 	return view('seller.choose-category', $data);
		    	}
                else{
                    return back();
		    	}
		    }else{
		    	return back()->with('status', 'No category found');
		    }	
    	}else{
    		$request->validate([
    			'grand_category' => 'numeric|required',
    			// 'parent_category' => 'numeric|required',
    			// 'child_category' => 'numeric|required',
    		]); 
            if($request->has('grand_category'))
    		    Session::put('grand_category', $request->grand_category);
            if($request->has('parent_category'))
                Session::put('parent_category', $request->parent_category);
    		if($request->has('child_category'))
    		    Session::put('child_category', $request->child_category);
        	return redirect()->route('add-product');
    	}
    }

    public function addProduct(Request $request, $edit_id = null){
        $cat = null;
        if(!is_null(Session::get('child_category')))
            $cat = Session::get('child_category');
        else if(!is_null(Session::get('parent_category')))
            $cat = Session::get('parent_category');
        else if(!is_null(Session::get('grand_category')))
            $cat = Session::get('grand_category');
        if($request->isMethod('get')){
        //CHECK EDIT MODE
            $is_edit = is_null($edit_id) ? false : true;
                    
            // dd($cat);
            $data['attributes']=Attribute::with('getAttributeValues')->where('category_id', $cat)->get();
            $data['is_edit'] = $is_edit;
            if($is_edit){
                $data['image2'] = getImage('p',$edit_id, 2, Auth::user()->id);
                $data['image3'] = getImage('p',$edit_id, 3, Auth::user()->id);
                $data['image4'] = getImage('p',$edit_id, 4, Auth::user()->id);
                $data['image5'] = getImage('p',$edit_id, 5, Auth::user()->id);
                $data['product'] = Product::find($edit_id);   
            }
            return view('seller.add-product', $data);
        }else{
            // dd($request->all());
            $is_edit = is_null($request->edit_id) ? false : true;
            $request->validate([
                'name'=>'required',
                'grand_category'=>'required',
                // 'parent_category'=>'required',
                // 'child_category'=>'required',
                'price'=>'required|numeric',
                'dis_price'=>'required|numeric',    
            ]);
            
            $attributes=Attribute::with('getAttributeValues')->where('category_id', $cat)->get();

            // CHECK MODE (EDIT OR ADD)
            if($is_edit){
                if ($request->file) {
                    // check if image exixts in edit mode/.................
                    $request->validate( [
                    'file'=>'required|image|mimes:jpeg,png,jpg|max:2048'
                    ]);  
                }
                if ($request->file2) {
                    // check if image exixts in edit mode/.................
                    $request->validate( [
                    'file2'=>'required|image|mimes:jpeg,png,jpg|max:2048'
                    ]);  
                }
                if ($request->file3) {
                    // check if image exixts in edit mode/.................
                    $request->validate( [
                    'file3'=>'required|image|mimes:jpeg,png,jpg|max:2048'
                    ]);  
                }
                if ($request->file4) {
                    // check if image exixts in edit mode/.................
                    $request->validate( [
                    'file4'=>'required|image|mimes:jpeg,png,jpg|max:2048'
                    ]);  
                }
                if ($request->file5) {
                    // check if image exixts in edit mode/.................
                    $request->validate( [
                    'file5'=>'required|image|mimes:jpeg,png,jpg|max:2048'
                    ]);  
                }
                    

                $product = Product::find($request->edit_id);
                if (!$product) {
                    return back()->with('status', 'Product not found');
                }
            }else{
                $request->validate( ['file'=>'required|image|mimes:jpeg,png,jpg|max:2048']);
                // CREATE NEW PRODUCT OBJECT
                $product = new Product();                

            }
                

            // SET OTHER MODEL DATA
            $product->name = $request->name;
            $product->role_id = Auth::user()->id;
            $product->grand_category_id = $request->grand_category;
            if($request->has('parent_category')); 
                $product->parent_category_id = $request->parent_category;
            if($request->has('child_category'));
                $product->category_id = $request->child_category;
            $product->mrp = $request->price;
            $product->offer_price = $request->dis_price;

            if($request->desc != ""){
                $product->description = $request->desc;    
            }
            $product->status = $request->status;

            // IF EMAGE IS NOT PRESENT IN EDIT MODE...    
            if ($is_edit && !$request->file){

            }else{
                $request->validate( ['file'=>'required|image|mimes:jpeg,png,jpg|max:2048']);
                // STORE PRODUCT IMAGE IN FOLDER
                if($is_edit){
                    $product->image = replaceProductImage($request,'file',$product->image);
                    if($is_edit){    
                }       
                }else{
                    $product->image = moveProductImage($request,'file');
                } 
            } 

            if($is_edit){
                if($request->file2){
                    $image2=isImageExist($request->edit_id, 2);
                    if(!$image2->isEmpty()){
                        $image2->image=replaceProductImage($request,'file2',$image2->image);
                        $image2->save();
                    }else{
                        $image2=new Image();
                        $image2->role_id=Auth::user()->id;
                        $image2->type='p';
                        $image2->type_id=$product->id;
                        $image2->priority=2;
                        $image2->image=moveProductImage($request,'file2');
                        $image2->save();
                    }
                }
                if($request->file3){
                    $image3=isImageExist($request->edit_id, 3);
                    if(!$image3->isEmpty()){
                        $image3->image=replaceProductImage($request,'file3',$image3->image);
                        $image3->save();
                    }else{
                        $image3=new Image();
                        $image3->role_id=Auth::user()->id;
                        $image3->type='p';
                        $image3->type_id=$product->id;
                        $image3->priority=3;
                        $image3->image=moveProductImage($request,'file3');
                        $image3->save();
                    }
                }
                if($request->file4){
                    $image4=isImageExist($request->edit_id, 4);
                    if(!$image4->isEmpty()){
                        $image4->image=replaceProductImage($request,'file4',$image4->image);
                        $image4->save();
                    }else{
                        $image4=new Image();
                        $image4->role_id=Auth::user()->id;
                        $image4->type='p';
                        $image4->type_id=$product->id;
                        $image4->priority=4;
                        $image4->image=moveProductImage($request,'file4');
                        $image4->save();
                    }
                }
                if($request->file5){
                    $image5=isImageExist($request->edit_id, 5);
                    if(!$image5->isEmpty()){
                        $image5->image=replaceProductImage($request,'file5',$image->image);
                        $image5->save();
                    }else{
                        $image5=new Image();
                        $image5->role_id=Auth::user()->id;
                        $image5->type='p';
                        $image5->type_id=$product->id;
                        $image5->priority=5;
                        $image5->image=moveProductImage($request,'file5');
                        $image5->save();
                    }
                }
            }
            
             
            // SAVE IMAGE NAME IN DATABASE                

            // ATTEMPT TO SAVE PRODUCT
            // dd($attributes);
            if($product->save()){
                foreach ($attributes as $key => $attribute) {
                    $name=strtolower($attribute->name).'s';
                    if($request->has($name)){
                        foreach ($request->$name as $attr) {
                            $productattributevalue= new Product_attribute();
                            $productattributevalue->product_id = $product->id;
                            $productattributevalue->attribute_value_id = $attr;
                            $productattributevalue->save();
                        }
                    }
                    $name=strtolower($attribute->name);
                    if($request->has($name)){
                        foreach ($request->$name as $attr) {
                            if(!is_null($attr)){
                                $attrvalue=Attribute_value::where(['attribute_id' => $attribute->id, 'value' => $attr])->first();
                                if(!$attrvalue){
                                    $attrvalue= new Attribute_value();
                                    $attrvalue->attribute_id = $attribute->id;
                                    $attrvalue->value = $attr;
                                    $attrvalue->is_verified = false;
                                    $attrvalue->status = true;
                                    $attrvalue->save();
                                }
                                $productattributevalue= new Product_attribute();
                                $productattributevalue->product_id = $product->id;
                                $productattributevalue->attribute_value_id = $attrvalue->id;
                                $productattributevalue->save();
                            }
                        }
                    }
                }

                if($is_edit){
                    $msg='Product Updated';
                    return redirect()->route('supplier_products')->with('success', $msg);
                }else{
                    Session::forget('grand_category');
                    Session::forget('parent_category');
                    Session::forget('child_category');
                    $msg='Product Uploaded';
                    return redirect()->route('supplier_products')->with('success', $msg);
                }

                
            }

            // NOT SAVED,
            // RETURN BACK WITH ERROR MSG
            return back()->with('error', 'Whoops, something went wrong? Please try after sometime');   
        }
    	
    }	

    public function products(Request $request){
        $data = $this->getAllData();
        $data['products']=Product::where('role_id', Auth::user()->id)->where('status', true)->orderBy('id', 'desc')->paginate(10);
        return view('seller.products')->with($data);
       
    }

    public function payouts(Request $request){
        $data = $this->getAllData();
        return view('seller.payouts')->with($data);
    }

    public function orders(Request $request, $type){
        $data = $this->getAllData();
        if($type=='p'){
            return view('seller.pending-orders')->with($data);
        }else{
            return view('seller.completed-orders')->with($data);
        }
    }

    public function account(Request $request, $typ=null){
        $data = $this->getAllData(); 
            $data['bank']=Bank::where('role_id',Auth::user()->id)->first();
            $data['pick_address']=Address::where(['role_id'=>Auth::user()->id, 'type'=>'pickup'])->first();
            $data['reg_address']=Address::where(['role_id'=>Auth::user()->id, 'type'=>'registered'])->first();
            $data['states']=State::where(['status'=>true])->get();

        if($request->isMethod('get')){           
            $data['typ']=$typ;

            return view('seller.my-account')->with($data);
        }else{
            //save basic details here...
            // dd($request->all(), $typ);
            if($typ=='basic'){
                $request->validate([
                    'name'=>'required',
                    ]);
                if($request->image){
                  $request->validate([
                    'image'=>'mimes:jpeg,png,jpg|max:1024',
                    ]);
                }
                if($request->mobile){
                  $request->validate([
                    'mobile'=>'required|numeric|digits:10',
                    ]);
                }  
                $supplier = Supplier::where('role_id', Auth::user()->id)->first();
                if(!$supplier){
                    $supplier = new Supplier();
                }
                if($request->image){
                    $destinationPath = public_path( '/supplier_images' );
                    $image = $request->image;
                    $fileName = 'sup'.rand(11111111111111,99999999999999). '.'.$image->clientExtension();
                    $image->move( $destinationPath, $fileName );
                    // dd($supplier->image);
                    if($supplier->image!='default.png' && !is_null($supplier->image)){
                        unlink(public_path('supplier_images/'.$supplier->image));
                    }
                    $supplier->image=$fileName;
                }
                $user=User::find(Auth::user()->id);
                $user->name=$request->name;
                $user->mobile=$request->mobile;
                Session::put('supplier.name', $request->name);
                $supplier->role_id=Auth::user()->id;
                $supplier->supplier_name=$request->name;
                $supplier->supplier_mobile=$request->mobile;
                if($supplier->save() && $user->save()){
                    $data['typ']=$typ;
                    $data['typ'] = 'gst';
                    return view('seller.my-account', $data)->with('success', 'Account Updated');
                }
                return back()->with('status', 'Something went wrong! Please try again.');
            }
            if($typ=='gst'){
                // dd($request->all());
                $validator = Validator::make($request->all(), [
                       'gst_number'=>'required',
                       // 'business_name'=>'required',
                       // 'pan_number'=>'required'
                   ]);
                 if(!$validator){
                    $data['typ']=$typ;
                    return view('seller.my-account')->with($data);
                 }
               $supplier = Supplier::where('role_id', Auth::user()->id)->first();
                if(!$supplier){
                    $supplier = new Supplier();
                }
               $reg_address = Address::where(['role_id'=>Auth::user()->id, 'type'=>'registered'])->first();
                // dd($reg_address);
                if(!$reg_address){
                    $reg_address = new Address();   
                }
                $supplier->role_id=Auth::user()->id;
                $supplier->gst_no=$request->gst_number;
                $supplier->pan_no=$request->pan_number;
                $supplier->business_name=$request->business_name;
                $supplier->business_type=$request->business_type ?? 'N/A';

                $reg_address->type='registered';
                $reg_address->role_id=Auth::user()->id;
                $reg_address->name=$request->business_name;
                $reg_address->email=Auth::user()->email;
                $reg_address->mobile=Auth::user()->mobile;
                $reg_address->address=$request->business_address;

                if($supplier->save() && $reg_address->save()){
                    $data['typ']=$typ;
                    $data['typ'] = 'pickup';
                    return view('seller.my-account', $data)->with('success', 'Account Updated');
                }
                return back()->with('status', 'Something went wrong! Please try again.');
            }
            if ($typ=='pickup') {

                $validate=$request->validate([
                   'state'=>'required',
                   'city'=>'required',
                   // 'business_name'=>'required', 
               ]);
                if(!$validate){
                    dd("error");
                }
                $pick_address = Address::where(['role_id'=>Auth::user()->id, 'type'=>'pickup'])->first();
                if(!$pick_address){
                    $pick_address = new Address();   
                }
                $pick_address->type='pickup';
                $pick_address->role_id=Auth::user()->id;
                $pick_address->name=Address::where(['role_id'=>Auth::user()->id, 'type'=>'registered'])->first()->name;
                $pick_address->email=Auth::user()->email;
                $pick_address->mobile=Auth::user()->mobile;
                $pick_address->state=$request->state;
                $pick_address->city=$request->city;
                $pick_address->pincode=$request->pincode;
                $pick_address->address=$request->address;
                if($pick_address->save() ){
                    $data['typ']=$typ;
                    $data['typ'] = 'bank';
                    return view('seller.my-account', $data)->with('success', 'Account Updated');
                }
                return back()->with('status', 'Something went wrong! Please try again.');

            }
            if ($typ=='bank') {
                $request->validate([
                   // 'ifsc'=>'required',
               ]);
                $bank=Bank::where(['account_number'=>$request->account_number, 'role_id'=>Auth::user()->id])->first();
                if(!$bank){
                    $bank = new Bank();   
                }
                $bank->role_id=Auth::user()->id;
                $bank->name=$request->account_holder_name;
                $bank->account_name=$request->bank_name;
                $bank->account_number=$request->account_number;
                $bank->ifsc=$request->ifsc_code;
                $bank->status=true;
                if($bank->save() ){
                    $data['typ']=$typ;
                    $data['typ'] = null;
                    return view('seller.my-account', $data)->with('success', 'Account Updated');
                }
                return back()->with('status', 'Something went wrong! Please try again.');

            }

        } 
        //     return view('seller.my-account')->with($data);
        //     $request->validate([
        //         'gst_number'=>'required',
        //         'business_name'=>'required',
        //         'pan_number'=>'required', 
        //         // 'business_type'=>'required',
        //         // 'business_address'=>'required',
        //         // 'state'=>'required', 
        //         // 'city'=>'required',
        //         // 'pincode'=>'required|digits:6',
        //         // 'address'=>'required',
        //         // 'account_holder_name'=>'required',
        //         // 'bank_name'=>'required',
        //         // 'account_number'=>'required',
        //         // 'ifsc_code'=>'required',
        //         // 'name'=>'required',
        //         'email'=>'required|email',
        //         'mobile'=>'required|numeric|digits:10',

        //     ]);
        //     // dd($request->all());
        //     if($request->image){
        //         $request->validate([
        //             'image'=>'mimes:jpeg,png,jpg|max:1024|dimensions:ratio=1/1',
        //         ]);
        //     }

        //     if ($request->i_agree=='on') {
        //         $supplier = Supplier::where('role_id', Auth::user()->id)->first();
        //         if(!$supplier){
        //             $supplier = new Supplier();
        //         }

                // $pick_address = Address::where(['role_id'=>Auth::user()->id, 'type'=>'pickup'])->first();
                // if(!$pick_address){
                //     $pick_address = new Address();   
                // }

        //         $reg_address = Address::where(['role_id'=>Auth::user()->id, 'type'=>'registered'])->first();
        //         // dd($reg_address);
        //         if(!$reg_address){
        //             $reg_address = new Address();   
        //         }

        //         $bank=Bank::where(['account_number'=>$request->account_number, 'role_id'=>Auth::user()->id])->first();
        //         if(!$bank){
        //             $bank = new Bank();   
        //         }

        //         $user=User::find(Auth::user()->id);
        //         $user->name=$request->name;
        //         Session::put('supplier.name', $request->name);

                // $supplier->role_id=Auth::user()->id;
                // $supplier->gst_no=$request->gst_number;
                // $supplier->business_name=$request->business_name;
                // $supplier->pan_no=$request->pan_number;
                // $supplier->business_type=$request->business_type ?? 'N/A';
                // $supplier->supplier_name=$request->name;
                // $supplier->state=$request->state;
                // $supplier->city=$request->city;
                // $supplier->supplier_mobile=$request->mobile;
                
                // $reg_address->type='registered';
                // $reg_address->role_id=Auth::user()->id;
                // $reg_address->name=$request->business_name;
                // $reg_address->email=Auth::user()->email;
                // $reg_address->mobile=$request->mobile;
                // $reg_address->address=$request->business_address;
                
                // $pick_address->type='pickup';
                // $pick_address->role_id=Auth::user()->id;
                // $pick_address->name=$request->business_name;
                // $pick_address->email=Auth::user()->email;
                // $pick_address->mobile=$request->mobile;
                // $pick_address->state=$request->state;
                // $pick_address->city=$request->city;
                // $pick_address->pincode=$request->pincode;
                // $pick_address->address=$request->address;

                // $bank->role_id=Auth::user()->id;
                // $bank->name=$request->account_holder_name;
                // $bank->account_name=$request->bank_name;
                // $bank->account_number=$request->account_number;
                // $bank->ifsc=$request->ifsc_code;
                // $bank->status=true;

        //         if($request->image){
        //             $destinationPath = public_path( '/supplier_images' );
        //             $image = $request->image;
        //             $fileName = 'sup'.rand(11111111111111,99999999999999). '.'.$image->clientExtension();
        //             $image->move( $destinationPath, $fileName );
        //             // dd($supplier->image);
        //             if($supplier->image!='default.jpg' && !is_null($supplier->image)){
        //                 unlink(public_path('supplier_images/'.$supplier->image));
        //             }
        //             $supplier->image=$fileName;
        //         }

        //         if($supplier->save() && $reg_address->save() && $pick_address->save() && $bank->save() && $user->save()){

        //             return back()->with('success', 'Account Updated');
        //         }
        //         return back()->with('status', 'Something went wrong! Please try again.');

        //     }else{
        //         return back()->with('status', 'You cannot proceed without agreeing out terms and conditions.');                
        //     }
        // }
    }

    public function settings(Request $request){
        $data = $this->getAllData();
        return view('seller.settings')->with($data);
    }

    public function purchases(Request $request){
        $data = $this->getAllData();
        return view('seller.purchases')->with($data);
    }

    public function favorites(Request $request){
        $data = $this->getAllData();
        return view('seller.favorites')->with($data);
    }

    public function moveToCompleteOrder(Request $request){
        $order=Order::find($request->orderId);
        $order->status='delivered';
        if($order->save()){ 
            return back()->with('success', 'Order moved to complete orders');
        }
        return back()->with('error', 'Something went wrong! Please try again');
    }

    function changePassword(Request $request){ 
        if($request->isMethod('get')){
            return view('seller.change-password');
        }else{
            if(Session::has('supplier')){
                // dd($request->all());
                $request->validate([
                    'current'=>'required',
                    'new'=>'required',
                    'confirm'=>'required',
                ]); 
                if($request->new != $request->confirm){
                    return back()->with('error', 'Password dosnt confirmed');
                }elseif($request->new == $request->confirm){
                    // dd(Session::all());
                    $role_id = Supplier::find(Auth::user()->id)->value('role_id');
                    // dd($role_id);
                    $user = User::find($role_id);
                    $old_pass_hash = trim($user->password);
                    $entered_old_pass = trim($request->current);
                    // dd($role_id,$entered_old_pass, $old_pass_hash, $request->new,Hash::check($entered_old_pass, $old_pass_hash));
                    // dd(Hash::check($entered_old_pass, $old_pass_hash));
                    if(Hash::check($entered_old_pass, $old_pass_hash)){
                        // dd('matched');
                        $user->password = Hash::make(trim($request->new));
                        
                        if($user->save()){
                            return back()->with('success', 'Password changed successfully
                                ');
                        }else{
                            return back()->with('error', 'Something went wrong please try again');
                        }

                    }else{
                        // dd('doesnt match');
                        return back()->with('error', 'Invalid Password');
                    }
                    // if($request->)
                }
            }
            else{
                return back('error', "UnAuthorized Access");
            }     
        }
           
    }

}
