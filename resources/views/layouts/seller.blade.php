@include('inc.seller-header')
@include('inc.seller-breadcrumb')
<div class="container mb-5 pb-3">
  <div class="bg-light shadow-lg rounded-3 overflow-hidden">
    <div class="row"> 
      
      @if(Auth::check() && Auth::user()->role == 's')
      
        @include('inc.seller-sidebar')

      @endif

      @yield('content')
    </div>
  </div>
  </main>
@include('inc.seller-footer')