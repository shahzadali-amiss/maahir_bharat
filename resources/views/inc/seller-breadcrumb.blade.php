@php
$supplier_details=getSupplierDetails();
@endphp
<div class="page-title-overlap bg-accent pt-4">
  <div class="container d-flex flex-wrap flex-sm-nowrap justify-content-center justify-content-sm-between align-items-center pt-2">
    <div class="d-flex align-items-center pb-3">
      <div class="img-thumbnail rounded-circle position-relative flex-shrink-0" style="width: 6.375rem;">
      
        @if($supplier_details)
          <img class="rounded-circle" src="{{ asset('supplier_images') }}/{{ $supplier_details->image }}">
        @else
          <img class="rounded-circle" src="{{ asset('images/store_icon.png') }}">
        @endif
        
      </div>
      <div class="ps-3">
        <h3 class="text-light fs-lg mb-0">
          @if($supplier_details)
            {{ $supplier_details->supplier_name }}
          @endif
        </h3>

        @if($supplier_details)
          <span class="d-block text-light fs-ms opacity-60 py-1">Joined on {{ date('d M, Y',strtotime($supplier_details->created_at)) }}</span>
        @endif
      </div>
    </div>
    <div class="d-flex">
      
      @if(Auth::check() && Auth::user()->role == 's')
        <div class="text-sm-end me-5">
          <div class="text-light fs-base">Total sales</div>
          <h3 class="text-light">₹{{getSupplierEarning()}}</h3>
        </div>

      @else

        <div class="text-sm-end me-5">
          <div class="text-light fs-base">
            <button class="btn btn-outline-light">Follow</button>
          </div>
        </div>

      @endif

      <div class="text-sm-end">
        <div class="text-light fs-base">Seller rating</div>
        <div class="star-rating"><i class="star-rating-icon ci-star-filled active"></i><i class="star-rating-icon ci-star-filled active"></i><i class="star-rating-icon ci-star-filled active"></i><i class="star-rating-icon ci-star-filled active"></i><i class="star-rating-icon ci-star"></i>
        </div>
        <div class="text-light opacity-60 fs-xs">Based on 0 reviews</div>
      </div>
    </div>
  </div>
</div>