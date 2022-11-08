@extends('layouts.home')
@section('content')

<div class="page-title-overlap bg-dark">
  <div class="container">
    
<nav aria-label="breadcrump">
  <div class="col-md-12" style="margin-left: -30px;">
	    <div class="breadcrumb-back">
	    	<div class="container">
	    		<ol class="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
					<li class="breadcrumb-item"><a class="text-nowrap" href="#"><i class="ci-home"></i>Home</a></li>
					<li class="breadcrumb-item text-nowrap active" aria-current="page">Shop</li>
        		</ol>
		    </div>
		</div>
	</nav>
</div>

  </div>
</div>

<div id="product-category" class="container">

		<div class="row">
			<aside id="column-left" class="col-sm-3 hidden-xs">
				<div class="category-list">
					<div class="box-category">
						<h3 class="toggled relative">Categories</h3> 
						<ul class="list-unstyled parent" id="selectMe-desk">
							@foreach($grands as $grand)
								<li class="has-more-category">
									<a {{ count($parents->where('parent_id', $grand->id)) >0 ? '' : "href=".route('products', $grand->id).""}}
										class="list-group-item main-item">{{ $grand->name }}<span class="{{ count($parents->where('parent_id', $grand->id)) >0 ? 'toggled' : ''}}"></span></a>
									@if(count($parents->where('parent_id', $grand->id)) >0)	
										<ul class="list-unstyled child-categories group">
											@foreach($parents as $pr)
                                                @if($pr->parent_id == $grand->id)
													<li>
														<a href="{{ route('products', [$grand->id,$pr->id]) }}"
															class="list-group-item">&nbsp;&nbsp;&nbsp; {{ $pr->name }}</a>
													</li>
												@endif
											@endforeach		
										</ul>
									@endif
								</li>
							@endforeach	
						</ul>
					</div>
				</div>

				<script>
					$(function () {
						$(".parent .fa.fa-plus").remove();
						$(".parent .toggled").append("<i class='fa fa-plus'></i>");
						$('.parent .toggled').click(function (e) {
							e.preventDefault();
							if (!$(this).parent().hasClass('active')) {
								$('+ ul', $('a.list-group-item.main-item')).slideUp();
								$('a.list-group-item.main-item').removeClass('active');
							}
							$(this).parent().toggleClass('active');
							$('+ ul', $(this).parent()).slideToggle('slow');
							return false;
						});
					});
				</script>

				<script>
					$('#button-filter').on('click', function () {
						filter = [];

						$('input[name^=\'filter\']:checked').each(function (element) {
							filter.push(this.value);
						});

						location = 'https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&path=18&filter=' + filter.join(',');
					});
				</script>

				<div class="swiper-viewport">
					<div id="banner0" class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<a href="#"><img
										src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/banners/cat-leftbanner-326x440.jpg"
										alt="Left Banner" class="img-responsive" /></a>
							</div>
						</div>
					</div>
				</div>
				<script>
					if ($('#banner0 .swiper-slide').length > 1) {
						$('#banner0').swiper({
							effect: 'fade',
							autoplay: 2500,
							autoplayDisableOnInteraction: false
						});
					}
				</script>

			</aside>

			<div id="content" class="col-sm-9">


				<div class="cat_info">
					<div class="row">
						
						<div class="col-sm-7 col-xs-12">
							<h2 class="page_title">{{$category ? ucwords($category->name) : 'All Category'}}</h2>							
						</div>

						<div class="col-sm-5 col-xs-5 cat-pagination-right">
							<div class="btn-group btn-group-sm">
								<button type="button" id="grid-view" class="btn btn-default active" data-toggle="tooltip" title="" data-original-title="Grid"><i class="icon-grid"></i></button>
								<button type="button" id="list-view" class="btn btn-default" data-toggle="tooltip" title="" data-original-title="List"><i class="icon-list"></i></button>
							</div>
						</div>

					</div>
				</div>

				
				<div class="row category-row">
					@foreach($products as $product)
					<div class="product-layout product-list col-xs-12">
						<div class="product-thumb">
							<div class="image" style="">
								<a
									href="{{ route('single', $product->id) }}">
									<img src="{{ asset('product_images/'.$product->image) }}"
										alt="Black Cap" title="Black Cap" class="img-responsive" />
									<img class="img-responsive hover-img"
										src="{{ asset('product_images/'.$product->image) }}"
										title="Black Cap" alt="Black Cap" />
								</a>

								<a href="{{ route('single', $product->id) }}" class="addcart" title="Add to Cart" style="background: #000; color: #f6f9fc;">Add to Cart</a>
							</div>

							<div class="thumb-description clearfix">
								<div class="caption">
									<h4 class="product-title"><a
											href="{{ route('single', $product->id) }}">{{ $product->name }}</a></h4>
									<p class="price">
										₹{{ $product->offer_price }}
										<span class="section-sale" style="color: green">
                                                  @php $decount = 100 * ($product->mrp - $product->offer_price) / $product->mrp; @endphp
                                                  {{ (integer) $decount }}% off
                                                </span>
									</p>
									<div class="rating">
										<span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
											class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
											class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
											class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
											class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span>
									</div>
									<p class="description">{{ $product->description }}</p>
									<!-- <button type="button" class="addcart" title="Add to Cart">Add to
										Cart</button> -->
								</div>
							</div>
						</div>
					</div>
					@endforeach	
				</div>

				<!-- laravel pagination -->
				 {{@$products->links()}}
				 
				<!-- <div class="pro_pagination">
					<div class="row">
						<div class="col-sm-6 text-left">Showing 1 to 12 of 18 (2 Pages)</div>
						<div class="col-sm-6 text-right">
							<ul class="pagination">
								<li class="active"><span>1</span></li>
								<li><a
										href="">2</a>
								</li>
								<li><a
										href="">&gt;</a>
								</li>
								<li><a
										href="">&gt;|</a>
								</li>
							</ul>
						</div>
					</div>
				</div> -->

			</div>

		</div>
</div>

<!-- top scroll -->
<a href="#" class="scrollToTop back-to-top" data-toggle="tooltip" title="Top"><i class="fa fa-angle-up"></i></a>
@endsection


@push('styles')
<style type="text/css">
	.page-title-overlap+* {
	    background: aliceblue;
	    padding: 25px;
	}
	.product-list .product-thumb .image {
		width: 250px;
	}
</style>
@endpush