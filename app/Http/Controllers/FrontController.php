<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request; 
 
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Attribute;
use App\Models\State;
use App\Models\City;
use App\Models\Supplier;
use App\Models\Attribute_value;
use App\Models\Product_attribute;
// use App\Models\ProductAttributeValue;
use Illuminate\Validation\Rules;
use App\Models\OTP;
use Validator;
use Session; 
use Auth;
   
class FrontController extends Controller
{

    public function sellerStore($role_id){
        $data['products'] = Product::where(['status' => 1, 'role_id' => $role_id])->orderBy('id', 'desc')->paginate(10);
        return view('seller.products')->with($data);
    }

    public function policy($type){
        return view('front.policies.'.$type);
    }

    public function customerRegister(Request $request){
        if($request->isMethod('get')){
            Session::forget(['supplier','customer']);    
            return view('auth.register'); 
        }else{
            $request->validate([
                'mobile' => ['numeric','digits:10'],
                'role' => ['required'],
                'password' => ['required', Rules\Password::defaults()],
            ]);
            $is_user_exist=getUser($request->mobile, $request->role);
            if(!$is_user_exist){
                $user = new User();
                $user->name = $request->name;
                $user->role = $request->role;
                $user->mobile = $request->mobile;
                $user->password = Hash::make($request->password);
                if($user->save()){
                    $user=User::find($user->id)->toArray();
                    $ses=['id'=>$user['id'], 'name'=>$user['name'], 'mobile'=>$user['mobile'], 'role'=>$user['role'], 'email'=>$user['email'], 'email_verified_at'=>$user['email_verified_at'], 'mobile_verified_at'=>$user['mobile_verified_at'], 'status'=>$user['status'], 'created_at'=>$user['created_at'], 'updated_at'=>$user['updated_at']];
                    Session::put('customer', $ses);
                    return redirect()->route('home');
                }else{
                    return back()->with('error', 'Something went wrong');
                }    
            }else{
                return back()->with('status', 'User already exist with this mobile number');
            }

            
        }
    }

    public function customerLogin(Request $request){
        if($request->isMethod('get')){    
            if(Session::has('customer')){
                return redirect()->route('home');
            }else{    
                return view('auth.login');
            }
        }else{
            $request->validate([
                'mobile' => ['numeric','digits:10'],
                'role' => ['required'],
                'password' => ['required', Rules\Password::defaults()],
            ]);
            $user=getUser($request->mobile, $request->role);
            if($user){
                $user=$user[0];
                if(Hash::check($request->password, $user['password'])){
                    $ses=['id'=>$user['id'], 'name'=>$user['name'], 'mobile'=>$user['mobile'], 'role'=>$user['role'], 'email'=>$user['email'], 'email_verified_at'=>$user['email_verified_at'], 'mobile_verified_at'=>$user['mobile_verified_at'], 'status'=>$user['status'], 'created_at'=>$user['created_at'], 'updated_at'=>$user['updated_at']];
                    Session::put('customer', $ses);
                    return redirect()->route('home');
                }else{
                    return back()->with('status', 'Incorrect Password');
                }
            }else{
                return back()->with('status', 'User doesn\'t exist');    
            }
        }
    }


    public function adminRegister(Request $request){
        Session::flush();
        if($request->isMethod('get')){        
            return view('admin.register');
        }else{
            $request->validate([
                'name' => ['required'],
                'email' => ['required'],
                'mobile' => ['numeric','digits:10'],
                'role' => ['required'],
                'password' => ['required', Rules\Password::defaults()],
            ]);
            $is_user_exist=getUser($request->mobile, $request->role);
            if(!$is_user_exist){
                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email; 
                $user->role = $request->role;
                $user->mobile = $request->mobile;
                $user->password = Hash::make($request->password);
                if($user->save()){ 
                    $user=User::find($user->id)->toArray();
                    $ses=['id'=>$user['id'], 'name'=>$user['name'], 'mobile'=>$user['mobile'], 'role'=>$user['role'], 'email'=>$user['email'], 'email_verified_at'=>$user['email_verified_at'], 'mobile_verified_at'=>$user['mobile_verified_at'], 'status'=>$user['status'], 'created_at'=>$user['created_at'], 'updated_at'=>$user['updated_at']];
                    Session::put('admin', $ses);
                    return redirect()->route('admin');
                }else{
                    return back()->with('error', 'Something went wrong');
                }    
            }else{
                return back()->with('status', 'Admin already exist with this mobile number');
            }

            
        }
    }
    public function adminLogin(Request $request){
        if($request->isMethod('get')){    
            if(Session::has('admin')){
                return redirect()->route('admin');
            }else{    
                return view('admin.login');
            }
        }else{
            $request->validate([
                'mobile' => ['numeric','digits:10'],
                'role' => ['required'],
                'password' => ['required', Rules\Password::defaults()],
            ]);
            $user=getUser($request->mobile, $request->role);
            if($user){
                $user=$user[0];
                if(Hash::check($request->password, $user['password'])){
                    $ses=['id'=>$user['id'], 'name'=>$user['name'], 'mobile'=>$user['mobile'], 'role'=>$user['role'], 'email'=>$user['email'], 'email_verified_at'=>$user['email_verified_at'], 'mobile_verified_at'=>$user['mobile_verified_at'], 'status'=>$user['status'], 'created_at'=>$user['created_at'], 'updated_at'=>$user['updated_at']];
                    Session::put('admin', $ses);
                    return redirect()->route('admin');
                }else{
                    return back()->with('status', 'Incorrect Password');
                }
            }else{
                return back()->with('status', 'Admin doesn\'t exist');    
            }
        }
    }



    public function supplierRegistration(Request $request){
        if($request->isMethod('get')){
            
            return view('seller.registration');
               
        }
        else{
            // return RegisteredUserController::store($request);
            return app(\App\Http\Controllers\Auth\RegisteredUserController::class)->store($request);
        }
    }

    public function getSupplierDetails(Request $request){
        if($request->isMethod('get')){
            if(Session::has('supplier')){
                return redirect()->route('seller-home');
            }else{    
                $is_user_exist=getUser(Session::get('seller-mobile'), Session::get('role'));
                if($is_user_exist){
                    Session::reflash('seller-mobile');
                    return redirect()->route('seller_login');    
                }else{
                    $data['mobile']=Session::get('seller-mobile');
                    $data['states'] = State::all();
                    $data['cities']  =City::all();
                    // UNCOMMENT THIS TO RANDOMLY GENERATE OTP
                    // $otp=rand(1111,9999);
                    $otp=1234;
                    Session::put('otp', $otp);
                    return view('seller.details', $data);
                }
            }    
        }else{
            // dd($request->all()); 
            $request->validate([
                'mobile' => ['required','numeric','digits:10'],
                'role' => ['required'],
                'otp' => ['required','digits:4','numeric'],
                'email' => ['email'],
                // 'state' => ['required'],
                // 'city' => ['required'],
                'password' => ['required', Rules\Password::defaults()],
            ]);

            $is_user_exist=getUser($request->mobile, $request->role);
            
            if(!$is_user_exist){
                
                if($request->otp==Session::get('otp')){
                    $user = new User();
                    $user->role = $request->role;
                    $user->mobile = $request->mobile;
                    // $user->state = $request->state;
                    // $user->city = $request->city;
                    if($request->email!="")
                        $user->email = $request->email;
                    $user->password = Hash::make($request->password);
                    if($user->save()){
                        $user=User::find($user->id)->toArray();
                        $ses=['id'=>$user['id'], 'name'=>$user['name'], 'mobile'=>$user['mobile'], 'role'=>$user['role'], 'email'=>$user['email'], 'email_verified_at'=>$user['email_verified_at'], 'mobile_verified_at'=>$user['mobile_verified_at'], 'status'=>$user['status'], 'created_at'=>$user['created_at'], 'updated_at'=>$user['updated_at']];
                        Session::put('supplier', $ses);
                        Session::forget('otp');
                        return redirect()->route('seller-home');
                    }else{
                        return back()->with('error', 'Something went wrong');
                    }        
                }else{
                    return back()->with('status', 'Incorrect OTP');
                }
                
            }else{
                return back()->with('status', 'User already exist with this mobile number');
            }
        }
    }

    public function sellerLogin(Request $request){
        if($request->isMethod('get')){
            if(Session::has('supplier')){
                return redirect()->route('seller-home');
            }else{    
                return view('seller.login');
            } 
            
        }else{
            $request->validate([
                'mobile' => ['required','numeric','digits:10'],
                'role' => ['required'],
                // 'password' => ['required', Rules\Password::defaults()],
                'password' => 'required',
            ]);
            $user = getUser($request->mobile, $request->role);
            if(!$user){
                Session::flash('seller-mobile', $request->mobile);
                Session::flash('role', $request->role);
                return redirect()->route('get-supplier-details');
            }else{
                $user=$user[0];
                if(Hash::check($request->password, $user['password'])){
                    $ses=['id'=>$user['id'], 'name'=>$user['name'], 'mobile'=>$user['mobile'], 'role'=>$user['role'], 'email'=>$user['email'], 'email_verified_at'=>$user['email_verified_at'], 'mobile_verified_at'=>$user['mobile_verified_at'], 'status'=>$user['status'], 'created_at'=>$user['created_at'], 'updated_at'=>$user['updated_at']];
                        Session::put('supplier', $ses);
                        return redirect()->route('seller-home');
                    }else{
                        return back()->with('status', 'Wrong password');
                    }
            }
        }
    }

    public function index(){ 
        // if(Auth::check()){
        //     if(Auth::user()->role == 's'){
        //         return redirect()->route('seller-home');
        //     }else if(Auth::user()->role == 'a'){
        //         return redirect()->route('admin');
        //     }
        // }
        $data = $this->getAllData(); 
        return view('welcome', $data);

    }

    function getStateAccording($id){
        // $city = City::all();
        // // dd($city);
        // $states = State::all();
        // foreach ($states as $s) {
        //     foreach ($city as $key => $c) {
        //         // dd($s->name, $c->state_id);
        //         if(strcmp($s->name, $c->state_id)){

        //         }else{
        //             dd($c->state_id,$s->name);
        //         }
        //         if($s->name == strtoupper($c->state_id)){
        //             $c->state_id = $s->id;
        //             // dd($c->state_id,$s->name);
        //             $c->save();
        //         }
        //     }
        // }
        // $city->save();
        $data = $this->getAllData();
        $suppliers = Supplier::where('state', $id)->get();
        $supp_ids = [];
        foreach ($suppliers as $s) {
            array_push($supp_ids, $s->id);
        }
        // $p = Product::all();
        if(!is_null($supp_ids) and count($supp_ids)>0){
            $data['products'] = Product::whereIn('role_id', $supp_ids)->paginate(8);
            $data['category'] = null;
            return view('shop.shop', $data);
        }else{
            $data['products'] = Product::where('role_id', 0)->paginate(8);//Product::whereIn('role_id', $supp_ids)->get();
            $data['category'] = null;
            return view('shop.shop', $data);
        }
        // dd($products);
    }

    public function showSingle($id=''){
        $data = $this->getAllData();
        // dd($id);
        if($id){

            $product =  Product::with('supplier')->find($id);
            // dd($product);
            $data['product']=$product;
            $data['product_attributes']=getProductAttributes($id);
            
            // dd($data['product_attributes']);
            // $data['product_attribute']=Product_attribute::with(['getAttributeValues' => function($q){
            //     $q->where('is_verified', '=', true)->where('status', '=', true);
            // }])->get();
            // dd($data['product_attribute']);
            $data['rel_products'] =  Product::where('category_id', $product->category_id)->where('id', 'not like', $id)->where('status', true)->get();
            $data['more_products'] =  Product::where('parent_category_id', $product->parent_category_id)->where('id', 'not like', $id)->where('status', true)->get();
        }
        else{
            dd('data not found');
        }
        
        return view('shop.single2', $data);
    }

    

    public function products(Request $request, $gid, $pid=null, $cid=null){
        $data = $this->getAllData();
        $cat=Product::where('grand_category_id', $gid);
        $data['category'] = Category::find($gid);

        if(!is_null($pid)){
            $cat->where('parent_category_id', $pid);
            $data['category'] = Category::find($pid);
        }
        if(!is_null($cid)){
            $cat->where('category_id', $cid);    
            $data['category'] = Category::find($cid);
        }
        $data['products'] = $cat->where('status',true)->paginate(50);
        // dd($data);
        return view('shop.shop')->with($data);
       
    }

    public function allProducts(Request $request){
        $data = $this->getAllData();
        $data['products']=Product::where('status',true)->orderBy('id', 'desc')->paginate(50);
        // dd($data['products']);
        $data['category'] = null;
        return view('shop.shop')->with($data);
       
    }
}
