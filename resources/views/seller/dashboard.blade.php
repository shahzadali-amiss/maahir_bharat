@extends('layouts.seller')
@section('content')

  <!-- Content-->
 <section class="col-lg-8 pt-lg-4 pb-4 mb-3">
    <div class="pt-2 px-4 ps-lg-0 pe-xl-5">
      <h2 class="h3 py-2 text-center text-sm-start">Dashboard</h2>
      <div class="row mx-n2 pt-2">
        <div class="col-md-4 col-sm-6 px-2 mb-4">
          <div class="bg-secondary h-100 rounded-3 p-4 text-center">
            <h3 class="fs-sm text-muted">Your Products</h3>
            <p class="h2 mb-2">{{count(getSupplierProducts())}}</p>
            <p class="fs-ms text-muted mb-0">Last Updated - {{date('d M Y')}}</p>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 px-2 mb-4">
          <div class="bg-secondary h-100 rounded-3 p-4 text-center">
            <h3 class="fs-sm text-muted">Total Pending Orders</h3>
            <p class="h2 mb-2">{{count(getSupplierOrders('pending'))}}</p>
            <!-- <p class="fs-ms text-muted mb-0"></p> -->
          </div>
        </div>
        <div class="col-md-4 col-sm-12 px-2 mb-4">
          <div class="bg-secondary h-100 rounded-3 p-4 text-center">
            <h3 class="fs-sm text-muted">Total Completed Orders</h3>
            <p class="h2 mb-2">{{count(getSupplierOrders('delivered'))}}</p>
            <p class="fs-ms text-muted mb-0">Based on list price</p>
          </div>
        </div>
        <div class="col-md-4 col-sm-12 px-2 mb-4">
          <div class="bg-secondary h-100 rounded-3 p-4 text-center">
            <h3 class="fs-sm text-muted">Today's Pending Orders</h3>
            <p class="h2 mb-2">{{(count(getToday('pending')))}}</p>
            <p class="fs-ms text-muted mb-0">Based on list price</p>
          </div>
        </div>
        <div class="col-md-4 col-sm-12 px-2 mb-4">
          <div class="bg-secondary h-100 rounded-3 p-4 text-center">
            <h3 class="fs-sm text-muted">Today's Completed Orders</h3>
            <p class="h2 mb-2">{{count(getToday('delivered'))}}</p>
            <p class="fs-ms text-muted mb-0">Based on list price</p>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 px-2 mb-4">
          <div class="bg-secondary h-100 rounded-3 p-4 text-center">
            <h3 class="fs-sm text-muted">Your earnings</h3>
            <p class="h2 mb-2">₹{{ getSupplierEarning() }}</p>
            <!-- <p class="fs-ms text-muted mb-0"></p> -->
          </div>
        </div>
      </div>
      <div class="row mx-n2">
        <div class="col-lg-12 px-2">
          <!-- <div class="card mb-4">
            <div class="card-body">
              <h3 class="fs-sm pb-3 mb-3 border-bottom">Sales value, USD <span class="fw-normal fs-xs text-muted">(Past 2 weeks)</span></h3>
              <div class="ct-chart ct-perfect-fourth" data-line-chart="{&quot;labels&quot;: [&quot;22 Jul&quot;, &quot;&quot;, &quot;24 Jul&quot;, &quot;&quot;, &quot;26 Jul&quot;, &quot;&quot;, &quot;28 Jul&quot;, &quot;&quot;, &quot;30 Jul&quot;, &quot;&quot;, &quot;01 Aug&quot;, &quot;&quot;, &quot;03 Aug&quot;, &quot;&quot;, &quot;05 Aug&quot;], &quot;series&quot;: [[0, 100, 200, 150, 50, 0, 0, 50, 0, 50, 50, 50, 0, 100, 0]]}"></div>
            </div>
          </div> -->
          <!-- <div class="card mb-4 mb-lg-2">
            <div class="card-body">
              <h3 class="fs-sm pb-3 mb-3 border-bottom">Order count <span class="fw-normal fs-xs text-muted">(Past 2 weeks)</span></h3>
              <div class="ct-chart ct-perfect-fourth" data-line-chart="{&quot;labels&quot;: [&quot;22 Jul&quot;, &quot;&quot;, &quot;24 Jul&quot;, &quot;&quot;, &quot;26 Jul&quot;, &quot;&quot;, &quot;28 Jul&quot;, &quot;&quot;, &quot;30 Jul&quot;, &quot;&quot;, &quot;01 Aug&quot;, &quot;&quot;, &quot;03 Aug&quot;, &quot;&quot;, &quot;05 Aug&quot;], &quot;series&quot;: [[0, 2, 4, 3, 1, 0, 0, 1, 0, 1, 1, 1, 0, 2, 0]]}" data-options="{&quot;axisY&quot;: {&quot;onlyInteger&quot;: true}}"></div>
            </div>
          </div> -->
        </div>
        <!-- <div class="col-lg-4 px-2">
          <div class="card">
            <div class="card-body">
              <h3 class="fs-sm pb-3 mb-0 border-bottom">Your top countries</h3>
              <div class="d-flex justify-content-between align-items-center fs-sm py-2 border-bottom">
                <div class="d-flex align-items-start py-1"><img src="../img/marketplace/account/flags/usa.png" width="20" alt="USA">
                  <div class="ps-1">United States</div>
                </div><span>$452</span>
              </div>
              <div class="d-flex justify-content-between align-items-center fs-sm py-2 border-bottom">
                <div class="d-flex align-items-start py-1"><img src="../img/marketplace/account/flags/sweden.png" width="20" alt="Sweden">
                  <div class="ps-1">Sweden</div>
                </div><span>$318</span>
              </div>
              <div class="d-flex justify-content-between align-items-center fs-sm py-2 border-bottom">
                <div class="d-flex align-items-start py-1"><img src="../img/marketplace/account/flags/india.png" width="20" alt="India">
                  <div class="ps-1">India</div>
                </div><span>$106</span>
              </div>
              <div class="d-flex justify-content-between align-items-center fs-sm py-2 border-bottom">
                <div class="d-flex align-items-start py-1"><img src="../img/marketplace/account/flags/france.png" width="20" alt="France">
                  <div class="ps-1">France</div>
                </div><span>$82</span>
              </div>
              <div class="d-flex justify-content-between align-items-center fs-sm py-2 border-bottom">
                <div class="d-flex align-items-start py-1"><img src="../img/marketplace/account/flags/argentina.png" width="20" alt="Argentina">
                  <div class="ps-1">Argentina</div>
                </div><span>$40</span>
              </div>
              <div class="d-flex justify-content-between align-items-center fs-sm pt-2">
                <div class="d-flex align-items-start py-1"><img src="../img/marketplace/account/flags/south-africa.png" width="20" alt="South Africa">
                  <div class="ps-1">South Africa</div>
                </div><span>$17</span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>

@endsection

@push('scripts')
<script type="text/javascript" src="{{ asset('vendor/simplebar/dist/simplebar.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('vendor/tiny-slider/dist/min/tiny-slider.js') }}"></script>
<script type="text/javascript" src="{{ asset('vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('vendor/chartist/dist/chartist.min.js') }}"></script>
@endpush

@push('styles')
<link rel="stylesheet" type="text/css" href="{{ asset('vendor/simplebar/dist/simplebar.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('vendor/tiny-slider/dist/tiny-slider.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('vendor/chartist/dist/chartist.min.css') }}">
<style type="text/css">
  nav-link-style:focus{
    color: red;
  }
</style>
@endpush