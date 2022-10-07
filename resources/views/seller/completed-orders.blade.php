@extends('layouts.seller')
@section('content')

<!-- Content-->
<section class="col-lg-8 pt-lg-4 pb-4 mb-3">
  <div class="pt-2 px-4 ps-lg-0 pe-xl-5">
    @include('inc.session-message')
    <h2 class="h3 py-2 text-center text-sm-start">Completed Orders</h2>
    <div class="table-responsive">
      @php $orders = getSupplierOrders('delivered'); @endphp
        @if(count($orders)<=0)
          <div class="container text-center">
            <h5>No Orders yet</h5>
            <div>
              <img src="{{ asset('img/empty-order.PNG') }}">
            </div>
          </div>
        @else
          <table class="table table-layout-fixed fs-sm mb-0 set-table">
            <thead>
              <tr>
                <th width="10%">Image</th>
                <th width="20%">Product</th>
                <th width="10%">Quantity</th>
                <th width="20%">Price</th>
                <th width="20%">Attributes</th>
                <th width="20%">OrderId</th>
              </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
            <tr>
              <td><img src="{{ asset('product_images') }}/{{ getProduct($order->product_id)->image }}" width="55px"></td>
              <td>{{ getProduct($order->product_id)->name }}</td>
              <td>{{ $order->quantity }}</td>
              <td>
                <span>Unit: </span>₹{{ $order->final_price }}<br>
                <span>Total: </span><b>₹{{ $order->quantity*$order->final_price }}</b>
              </td>
              <td>
                @php $attr = json_decode($order->attributes); @endphp
                @if(!is_null($attr))
                  @foreach( $attr as $a => $v)
                    <div class="fs-sm"><span class="text-muted me-2">{{ucwords($a)}}:</span>{{ucwords($v)}}</div>
                  @endforeach
                @endif
              </td>
              <td>{{ $order->order_id }}</td>
            </tr>
            @endforeach
            </tbody>
          </table>
        @endif  
      </div>
      <hr class="mb-grid-gutter">
        <!-- Pagination-->
        {!! getSupplierOrders('delivered')->links() !!}
        <!-- <nav class="d-md-flex justify-content-between align-items-center text-center text-md-start" aria-label="Page navigation">
          <div class="d-md-flex align-items-center w-100"><span class="fs-sm text-muted me-md-3">Showing 10 of 52 records</span>
            <div class="progress w-100 my-3 mx-auto mx-md-0" style="max-width: 10rem; height: 4px;">
              <div class="progress-bar" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <button class="btn btn-outline-primary btn-sm" type="button">More records</button>
        </nav> -->
    </div>
  </section>
@endsection

@push('styles')
  <style>
    nav .pagination{
        justify-content: center;
      }

    @media (max-width: 560px){
      .set-table{
        width:150%!important;
      }      
    }
  </style>
@endpush