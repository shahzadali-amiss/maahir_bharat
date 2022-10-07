@extends('layouts.home2')
@section('content')
	<section>
		<div class="container py-5">
			<div class="row justify-content-center" style="margin-top:15px; ">
				<div class="col-md-12">
					@if(Session::has('error'))
		         		<div class="alert alert-danger" role="alert">
		                  	{{Session::get('error')}} 
		              	</div>
		            @endif
		            @if(Session::has('status'))
		         		<div class="alert alert-danger" role="alert">
		                  	{{Session::get('status')}}  
		              	</div>
		            @endif

					<form action="{{ route('seller_login') }}" method="post" class="w-100 bg-light">
						@csrf
						<input type="hidden" value="s" name="role">
						<div class="form-group mb-4">
	                        <label for="mobile">Email</label>
	                        <input id="email" class="form-control @error('mobile') is-invalid @enderror" name="email" type="email" value="{{ Session::get('seller-mobile') }}">
                      	</div>
                      	<div class="form-group mb-4">
		                    <x-label for="password" :value="__('Password :')" />

		                    <x-input id="password" class="form-control @error('password')"
		                                    type="password"
		                                    name="password"
		                                    required autocomplete="new-password" />
		                </div>

                      	<div class="form-group text-center mt-3">
                      		<input class="btn btn-primary" type="submit" value="Login">
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
@endsection