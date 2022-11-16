@extends('layouts.home')
@section('content')

@include('inc.session-message')
<div class="page-title-overlap bg-dark pt-4">
  <div class="container d-lg-flex justify-content-between py-2 py-lg-3 check-out-before">
    <div class="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
          <li class="breadcrumb-item"><a class="text-nowrap" href="#"><i class="ci-home"></i>Home</a></li>
          <li class="breadcrumb-item text-nowrap"><a href="#">Shop</a>
          </li>
          <li class="breadcrumb-item text-nowrap active" aria-current="page">Cart</li>
        </ol>
      </nav>
    </div>
    <div class="order-lg-1 pe-lg-4 text-center text-lg-start lg-heading">
      <h1 class="h3 text-light mb-0">Shoping Cart</h1>
    </div>
  </div>
</div>

<div class="container pb-5 mb-2 mb-md-4">
    <div class="row">
      <section class="col-lg-8">
        <!-- Steps-->
        <div class="steps steps-light pt-2 pb-3 mb-5">
          <a class="step-item active current" href="http://127.0.0.1:8000/shop/cart">
            <div class="step-progress">
              <span class="step-count">1</span>
            </div>
            <div class="step-label">
              <i class="ci-cart"></i>Cart
            </div>
          </a>
          <a class="step-item" href="http://127.0.0.1:8000/shop/checkout/details">
            <div class="step-progress">
              <span class="step-count">2</span>
            </div>
            <div class="step-label">
              <i class="ci-user-circle"></i>Shipping Details
            </div>
          </a>
          <a class="step-item" href="#">
            <div class="step-progress">
              <span class="step-count">3</span>
            </div>
            <div class="step-label">
              <i class="ci-check-circle"></i>Order Review
            </div>
          </a>
          <a class="step-item" href="#">
            <div class="step-progress">
              <span class="step-count">4</span>
            </div>
            <div class="step-label">
              <i class="ci-card"></i>Payment
            </div>
          </a>
          <a class="step-item" href="#">
            <div class="step-progress">
              <span class="step-count">5</span>
            </div>
            <div class="step-label">
              <i class="ci-card"></i>Order Status
            </div>
          </a>
        </div>

        <div class="col-12">
          
          <h2 class="">Shopping Cart</h2><br>

          {{-- <form action="{{ route('addtocart') }}" method="post" enctype="multipart/form-data">
            @csrf --}}
              <div class="table-responsive">
                  <table class="table table-bordered">
                      <thead>
                          <tr>
                              <td class="text-center">Product Image</td>
                              <td class="text-left">Product Name</td>
                              <!-- <td class="text-left">Model</td> -->
                              <td class="text-left">Quantity</td>
                              <td class="text-right">Unit Price</td>
                              <td class="text-right">Total</td>
                          </tr>
                      </thead>
                      <tbody>
                      {{-- {{ dd(getCartProducts()) }} --}}

                        @foreach( getCartProducts() as $key => $product )
                          <tr>
                              <td class="text-center"> 
                                <a href="#">
                                  <img src="{{ asset('product_images/'.$product->image) }}" alt="{{ $product->name }}" title="{{ $product->name }}" class="img-thumbnail" width="150px">
                                </a> 
                              </td>
                              <td class="text-left"><a href="">{{ $product->name }}</a>
                                  <br>
                                  <!-- <small>Size: Large</small> -->
                              </td>
                              
                              {{--
                              <td class="text-left">
                                @if(getCartProductAttributes($product->id))
                                  @foreach( getCartProductAttributes($product->id) as $a => $v )
                                  <div class="fs-sm"><span class="text-muted me-2">{{ucwords($a)}}:</span><b>{{ucwords($v)}}</b></div>
                                  @endforeach
                                @endif
                              </td>
                              --}}

                              <td class="text-left">
                                <form action="{{ route('update-quantity') }}" method="post">
                                  @csrf
                                  <div class="cart_input_block input-group btn-block" style="max-width: 200px; display: table;">
                                      <input type="hidden" name="product_id" value="{{ $product->id }}">
                                      <input type="number" name="quantity" value="{{ $quantity = getCartProductQuantity($product->id) }}" size="1" min="1"class="form-control" style="width: 150px !important">
                                      <span class="input-group-btn">
                                          <button type="submit" data-toggle="tooltip" title="" class="btn btn-primary" data-original-title="Update"><i class="fa fa-refresh"></i> Update</button>
                                          {{-- <button type="button" data-toggle="tooltip" title="" class="btn btn-danger" onclick="cart.remove('37');" data-original-title="Remove"><i class="fa fa-times-circle"></i></button> --}}
                                          <a class="btn btn-danger" href="{{ route('delete-cart-product', $product->id) }}" onclick="return confirm('Are you sure to remove this product?')" aria-label="Remove" data-original-title="Remove"><i class="fa fa-times-circle"></i></a>
                                      </span>
                                  </div>
                                </form>
                              </td>
                              <td class="text-right">₹{{ $product->offer_price }}</td>
                              <td class="text-right">₹{{ $product->offer_price * $quantity }}</td>
                          </tr>
                        @endforeach

                      </tbody>

                  </table>
              </div>
          {{-- </form> --}}
        </div>

        <!-- Navigation (desktop)-->
        <div class="d-none d-lg-flex pt-4 mt-3">
          <div class="w-50 pe-3"><a class="btn btn- d-block w-100 checkout-back-bt" href="http://127.0.0.1:8000/shop/cart"><i class="ci-arrow-left mt-sm-0 me-1"></i><span class="d-none d-sm-inline">Back to Cart</span><span class="d-inline d-sm-none">Back</span></a></div>
          <div class="w-50 ps-2"><a href="{{ route('checkout-details') }}" class="btn btn-primary d-block w-100" onclick=""><span class="d-none d-sm-inline">Proceed to Order Review</span><span class="d-inline d-sm-none">Next</span><i class="ci-arrow-right mt-sm-0 ms-1"></i></a></div>
        </div>
      </section>
      <!-- Sidebar-->
      <aside class="col-lg-4 pt-4 pt-lg-0 ps-xl-5">
        <table class="table table-bordered" style="background-color: #fff">
          <tbody>
            <tr>
              <td colspan="2">
                <h3>Payment Summary</h3>
              </td>
            </tr>
            <tr>
              <td class="text-left cart-total-title">Sub-Total:</td>
              <td class="text-right cart-total-price">₹{{getCartSubTotal()}}</td>
            </tr>
            {{-- <tr>
              <td class="text-left cart-total-title">Eco Tax (-2.00):</td>
              <td class="text-right cart-total-price">₹0.00</td>
            </tr>
            <tr>
              <td class="text-left cart-total-title">VAT (20%):</td>
              <td class="text-right cart-total-price">₹0.00</td>
            </tr> --}}
            <tr>
              <th class="text-left cart-total-title">Total:</th>
              <th class="text-right cart-total-price">₹{{getCartSubTotal()}}</th>
            </tr>
            <tr>
              <td colspan="2">
                <label class="control-label" for="input-coupon">Do you have coupon?</label>
                <div class="input-group">
                    <input type="text" name="coupon" value="" placeholder="Enter your coupon here" id="input-coupon" class="form-control">
                    <!-- <span class="input-group-btn">
                        <input type="button" value="Apply Coupon" id="button-coupon" data-loading-text="Loading..." class="btn btn-primary">
                    </span> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </aside>
    </div>
    <!-- Navigation (mobile)-->
    <div class="row d-lg-none">
      <div class="col-lg-8">
        <div class="d-flex pt-4 mt-3">
          <div class="w-50 pe-3"><a class="btn checkout-back-bt d-block w-100" href="http://127.0.0.1:8000/home?shop&amp;cart"><i class="ci-arrow-left mt-sm-0 me-1"></i><span class="d-none d-sm-inline">Back to Cart</span><span class="d-inline d-sm-none">Back</span></a></div>
          <div class="w-50 ps-2"><button class="btn btn-primary d-block w-100" onclick="jQuery('#address-form').submit();"><span class="d-none d-sm-inline">Proceed to Order Review</span><span class="d-inline d-sm-none">Next</span><i class="ci-arrow-right mt-sm-0 ms-1"></i></button></div>
        </div>
      </div>
    </div>
  </div>

@endsection
