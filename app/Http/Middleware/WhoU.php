<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WhoU
{
    public function handle(Request $request, Closure $next, ...$guards)
    {
        // $guards = empty($guards) ? [null] : $guards;

        // foreach ($guards as $guard) {
        //     if (Auth::guard($guard)->check()) {
                
        //         // dd(Auth::user());
        //         // dd('working');

        //         if(Auth::user()->role == 's'){
        //             return redirect(RouteServiceProvider::SUPPLIER_HOME);
        //         }else{
        //             return redirect('/');
        //         }
        //     }
        // }


        if(Auth::check()){
            // dd(Auth::user()->role);
            if (Auth::user()->role == 's') {
                return $next($request);
            }
            else{
                return redirect('/');
            }
        }else{
            return redirect('/login');
        }

    }


}
