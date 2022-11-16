@extends('layouts.seller') 
@section('content')

<!-- Content-->
@if(Auth::check() && Auth::user()->role == 's')
<section class="col-lg-8 pt-lg-4 pb-4 mb-3">
  <div class="pt-2 px-4 ps-lg-0 pe-xl-5"> 
@else
<section class="col-lg-12 pt-lg-4 pb-4 mb-3"> 
  <div class="pt-2 px-4 ps-lg-5 pe-xl-5">
@endif
{{-- {{ dd($products) }} --}}
    <!-- Title-->
    <div class="d-sm-flex flex-wrap justify-content-between align-items-center border-bottom">
      <h2 class="h3 py-2 me-2 text-center text-sm-start">
        @if(Auth::check() && Auth::user()->role == 's' && Auth::user()->id==$products->first()->role_id)
          Your products
        @else
          Product Catalog
        @endif

        <span class="badge bg-faded-accent fs-sm text-body align-middle ms-2">{{count($products)}}</span>
      </h2>
     {{--  <div class="py-2">
        <div class="d-flex flex-nowrap align-items-center pb-3">
          <label class="form-label fw-normal text-nowrap mb-0 me-2" for="sorting">Sort by:</label>
          <select class="form-select form-select-sm me-2" id="sorting">
            <option>Date Created</option>
            <option>Product Name</option>
            <option>Price</option>
            <option>Your Rating</option>
            <option>Updates</option>
          </select>
          <button class="btn btn-outline-secondary btn-sm px-2" type="button"><i class="ci-arrow-up"></i></button>
        </div>
      </div> --}}
    </div>
    @include('inc.session-message')
    @if(count($products)<=0)
      <div class="container mt-5 text-center">
        <h5 class="m-5">Add your first Product</h5>
        <div>
          <img src="{{ asset('img/not-product.png') }}" width="100">
        </div>
        <a href="{{ route('choose_category', 'single') }}" class="btn btn-primary m-4">Add Product</a>
      </div>
    @else 

    <div class="row">
      @foreach( $products as $p )
      <!-- Product-->
      <div class="pro_div col-sm-6 {{ Auth::check() && Auth::user()->role=='s' ? 'col-md-3': 'col-md-2' }} align-items-center py-2 border-bottom">

        @php
          if(Auth::check() && Auth::user()->role == 's' && Auth::user()->id==$p->role_id){
            $product_link = route('edit-product', $p->id);
          }
          else{
            $product_link = route('single', $p->id);
          }
        @endphp

        <a class=" mb-3 mb-sm-0 me-sm-4 ms-sm-0 mx-" href="{{ $product_link }}" style="width: 12.5rem;"><img class="w-100" src="{{asset('/product_images/'.$p->image)}}" alt=""></a>

        <div class="">
          <h5 class="h6 product-title mb-1 mt-1"><a href="{{ $product_link }}"><small>{{ ucwords($p->name) }}</small></a></h5>
          <div class="d-flex justify-content-around text-accent">
            <span class="fs-small text-">₹ {{ $p->offer_price}}
            <del class="text-muted fs-sm me-3">₹ {{$p->mrp}}
            </del>
            </span>
            <span class="section-sale" style="color: green">
              @php $decount = 100 * ($p->mrp - $p->offer_price) / $p->mrp; @endphp
              {{ (integer) $decount }}% off
            </span>
          </div>
          <!-- <div class="d-inline-block text-muted fs-ms border-start ms-2 ps-2">Sales: <span class="fw-medium">26</span></div>
          <div class="d-inline-block text-muted fs-ms border-start ms-2 ps-2">Earnings: <span class="fw-medium">$327.<small>60</small></span></div> -->

          @if(Auth::check() && Auth::user()->role == 's' && Auth::user()->id==$p->role_id)
          <div class="text-center pt-2">
            <!-- <a class="btn bg-faded-accent btn-icon me-2" type="button" data-bs-toggle="tooltip" title="Download"><i class="ci-download text-accent"></i></a> -->
            <a class="btn bg-faded-info btn-icon me-2" href="{{route('edit-product', $p->id)}}" type="button" data-bs-toggle="tooltip" title="Edit"><i class="ci-edit text-info"></i></a>
            <a class="btn bg-faded-danger btn-icon" type="button" data-bs-toggle="tooltip" title="Delete" onclick="return confirm('Are you sure to delete this product?')" href="{{ route('delete-product', $p->id) }}"><i class="ci-trash text-danger"></i></a>
          </div>
          @endif

        </div>
      </div>
      @endforeach
    </div>  
  </div>
  <div>
  {!! $products->links("pagination::bootstrap-4") !!}
  @endif
  </div> 
</section>

@endsection

@push('styles')
  <style>
    nav .pagination{
        justify-content: center;
      }
      .pro_div:hover{
        box-shadow: 2px 2px 2px  2px #d7dbe6;
      }

      @media (min-width: 1060px){
        .pro_div img{
          height: 180px;
          background-position: center;
          object-fit: cover;
        } 
      }
  
      @media (min-width: 700px) and (max-width: 1024px){
        .pro_div img{
          height: 160px;
          background-position: center;
          object-fit: cover;
        } 

      }
      @media (min-width: 530px) and (max-width: 700px){
        .pro_div img{
          height: 220px;
          background-position: center;
          object-fit: cover;
        } 
      }
      .pro_div .product-title{
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
  </style>
@endpush