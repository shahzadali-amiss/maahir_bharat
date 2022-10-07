@extends('layouts.common')
@section('content')
  <div class="bg-dark py-4">
    <div class="container d-lg-flex justify-content-between py-2 py-lg-3">
      <div class="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
            <li class="breadcrumb-item"><a class="text-nowrap" href="index.html"><i class="ci-home"></i>Home</a></li>
            <li class="breadcrumb-item text-nowrap"><a href="#">Shop</a>
            </li>
            <li class="breadcrumb-item text-nowrap active" aria-current="page">Order tracking</li>
          </ol>
        </nav>
      </div>
      <div class="order-lg-1 pe-lg-4 text-center text-lg-start">
        <h1 class="h3 text-light mb-0">Tracking order: <span class="h4 fw-normal text-light">34VB5540K83</span></h1>
      </div>
    </div>
  </div>
  <div class="container py-5 mb-2 mb-md-3">
    <!-- Details-->
    <div class="row gx-4 mb-4">
      <div class="col-md-4 mb-2">
        <div class="bg-secondary h-100 p-4 text-center rounded-3"><span class="fw-medium text-dark me-2">Shipped via:</span>UPS Ground</div>
      </div>
      <div class="col-md-4 mb-2">
        <div class="bg-secondary h-100 p-4 text-center rounded-3"><span class="fw-medium text-dark me-2">Status:</span>Processing order</div>
      </div>
      <div class="col-md-4 mb-2">
        <div class="bg-secondary h-100 p-4 text-center rounded-3"><span class="fw-medium text-dark me-2">Expected date:</span>October 15, 2019</div>
      </div>
    </div>
    <!-- Progress-->
    <div class="card border-0 shadow-lg">
      <div class="card-body pb-2">
        <ul class="nav nav-tabs media-tabs nav-justified">
          <li class="nav-item">
            <div class="nav-link completed">
              <div class="d-flex align-items-center">
                <div class="media-tab-media"><i class="ci-bag"></i></div>
                <div class="ps-3">
                  <div class="media-tab-subtitle text-muted fs-xs mb-1">First step</div>
                  <h6 class="media-tab-title text-nowrap mb-0">Order placed</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link active">
              <div class="d-flex align-items-center">
                <div class="media-tab-media"><i class="ci-settings"></i></div>
                <div class="ps-3">
                  <div class="media-tab-subtitle text-muted fs-xs mb-1">Second step</div>
                  <h6 class="media-tab-title text-nowrap mb-0">Processing order</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <div class="d-flex align-items-center">
                <div class="media-tab-media"><i class="ci-star"></i></div>
                <div class="ps-3">
                  <div class="media-tab-subtitle text-muted fs-xs mb-1">Third step</div>
                  <h6 class="media-tab-title text-nowrap mb-0">Quality check</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <div class="d-flex align-items-center">
                <div class="media-tab-media"><i class="ci-package"></i></div>
                <div class="ps-3">
                  <div class="media-tab-subtitle text-muted fs-xs mb-1">Fourth step</div>
                  <h6 class="media-tab-title text-nowrap mb-0">Product dispatched</h6>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Footer-->
    <div class="d-sm-flex flex-wrap justify-content-between align-items-center text-center pt-4">
      <div class="form-check mt-2 me-3">
        <input class="form-check-input" type="checkbox" id="notify-me" checked>
        <label class="form-check-label" for="notify-me">Notify me when order is delivered</label>
      </div><a class="btn btn-primary btn-sm mt-2" href="#order-details" data-bs-toggle="modal">View Order Details</a>
    </div>
  </div>
</main>
<div class="modal fade" id="order-details">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Order No - 34VB5540K83</h5>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body pb-0">
        <!-- Item-->
        <div class="d-sm-flex justify-content-between mb-4 pb-3 pb-sm-2 border-bottom">
          <div class="d-sm-flex text-center text-sm-start"><a class="d-inline-block flex-shrink-0 mx-auto" href="shop-single-v1.html" style="width: 10rem;"><img src="{{asset('img/shop/cart/01.jpg')}}" alt="Product"></a>
            <div class="ps-sm-4 pt-2">
              <h3 class="product-title fs-base mb-2"><a href="shop-single-v1.html">Women Colorblock Sneakers</a></h3>
              <div class="fs-sm"><span class="text-muted me-2">Size:</span>8.5</div>
              <div class="fs-sm"><span class="text-muted me-2">Color:</span>White &amp; Blue</div>
              <div class="fs-lg text-accent pt-2">$154.<small>00</small></div>
            </div>
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Quantity:</div>1
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Subtotal</div>$154.<small>00</small>
          </div>
        </div>
        <!-- Item-->
        <div class="d-sm-flex justify-content-between my-4 pb-3 pb-sm-2 border-bottom">
          <div class="d-sm-flex text-center text-sm-start"><a class="d-inline-block flex-shrink-0 mx-auto" href="shop-single-v1.html" style="width: 10rem;"><img src="{{asset('img/shop/cart/02.jpg')}}" alt="Product"></a>
            <div class="ps-sm-4 pt-2">
              <h3 class="product-title fs-base mb-2"><a href="shop-single-v1.html">TH Jeans City Backpack</a></h3>
              <div class="fs-sm"><span class="text-muted me-2">Brand:</span>Tommy Hilfiger</div>
              <div class="fs-sm"><span class="text-muted me-2">Color:</span>Khaki</div>
              <div class="fs-lg text-accent pt-2">$79.<small>50</small></div>
            </div>
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Quantity:</div>1
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Subtotal</div>$79.<small>50</small>
          </div>
        </div>
        <!-- Item-->
        <div class="d-sm-flex justify-content-between my-4 pb-3 pb-sm-2 border-bottom">
          <div class="d-sm-flex text-center text-sm-start"><a class="d-inline-block flex-shrink-0 mx-auto" href="shop-single-v1.html" style="width: 10rem;"><img src="{{asset('img/shop/cart/03.jpg')}}" alt="Product"></a>
            <div class="ps-sm-4 pt-2">
              <h3 class="product-title fs-base mb-2"><a href="shop-single-v1.html">3-Color Sun Stash Hat</a></h3>
              <div class="fs-sm"><span class="text-muted me-2">Brand:</span>The North Face</div>
              <div class="fs-sm"><span class="text-muted me-2">Color:</span>Pink / Beige / Dark blue</div>
              <div class="fs-lg text-accent pt-2">$22.<small>50</small></div>
            </div>
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Quantity:</div>1
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Subtotal</div>$22.<small>50</small>
          </div>
        </div>
        <!-- Item-->
        <div class="d-sm-flex justify-content-between my-4">
          <div class="d-sm-flex text-center text-sm-start"><a class="d-inline-block flex-shrink-0 mx-auto" href="shop-single-v1.html" style="width: 10rem;"><img src="{{asset('img/shop/cart/04.jpg')}}" alt="Product"></a>
            <div class="ps-sm-4 pt-2">
              <h3 class="product-title fs-base mb-2"><a href="shop-single-v1.html">Cotton Polo Regular Fit</a></h3>
              <div class="fs-sm"><span class="text-muted me-2">Size:</span>42</div>
              <div class="fs-sm"><span class="text-muted me-2">Color:</span>Light blue</div>
              <div class="fs-lg text-accent pt-2">$9.<small>00</small></div>
            </div>
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Quantity:</div>1
          </div>
          <div class="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
            <div class="text-muted mb-2">Subtotal</div>$9.<small>00</small>
          </div>
        </div>
      </div>
      <!-- Footer-->
      <div class="modal-footer flex-wrap justify-content-between bg-secondary fs-md">
        <div class="px-2 py-1"><span class="text-muted">Subtotal:&nbsp;</span><span>$265.<small>00</small></span></div>
        <div class="px-2 py-1"><span class="text-muted">Shipping:&nbsp;</span><span>$22.<small>50</small></span></div>
        <div class="px-2 py-1"><span class="text-muted">Tax:&nbsp;</span><span>$9.<small>50</small></span></div>
        <div class="px-2 py-1"><span class="text-muted">Total:&nbsp;</span><span class="fs-lg">$297.<small>00</small></span></div>
      </div>
    </div>
  </div>
</div>
@endsection