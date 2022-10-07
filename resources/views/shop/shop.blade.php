@extends('layouts.home')
@section('content')

<div id="product-category" class="container">
		<ul class="breadcrumb">
			<li>
				<a href="{{ route('guest-home') }}">Home</a>
			</li>
			<li>
				<a href="{{ route('all-products') }}">Shop</a>
			</li>
		</ul>
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

				<!-- <div class="panel panel-default filter">
					<div class="box-content">
						<div id="filter">
							<h3 class="panel-heading toggled">Refine Search</h3>
							<div class="filter_box">
								<div class="list-group list-group-filter">
									<div class="list-group-items">
										<a class="list-group-item">color</a>
										<div class="list-group-item">
											<div id="filter-group1">
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="3" />
														black
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="2" />
														Blue
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="1" />
														Red
													</label>
												</div>
											</div>
										</div>
									</div>
									<div class="list-group-items">
										<a class="list-group-item">price</a>
										<div class="list-group-item">
											<div id="filter-group2">
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="5" />
														$150- $350
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="4" />
														$49-$149
													</label>
												</div>
											</div>
										</div>
									</div>
									<div class="list-group-items">
										<a class="list-group-item">size</a>
										<div class="list-group-item">
											<div id="filter-group3">
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="8" />
														large
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="7" />
														medium
													</label>
												</div>
												<div class="checkbox">
													<label>
														<input type="checkbox" name="filter[]" value="6" />
														small
													</label>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="panel-footer text-right">
									<button type="button" id="button-filter" class="btn btn-primary">Refine
										Search</button>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<script>
					$('#button-filter').on('click', function () {
						filter = [];

						$('input[name^=\'filter\']:checked').each(function (element) {
							filter.push(this.value);
						});

						location = 'https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&path=18&filter=' + filter.join(',');
					});
				</script>

				<!-- <div class="box all-products mt-80">
					<div class="container">
						<div class="box-heading">
							<div class="box-content bestseller">
								<div class="page-title toggled">
									<h3>Bestsellers</h3>
								</div>
								<div class="block_box row">
									<div id="bestseller-carousel" class="box-product  product-carousel  clearfix"
										data-items="4">
										<div class="product-layout  col-xs-12">
											<div class="product-thumb transition clearfix">
												<div class="image">
													<a
														href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/product&amp;product_id=48">
														<img src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/7-80x80.jpg"
															alt="Round Goggle" title="Round Goggle"
															class="img-responsive" />
														<img class="img-responsive hover-img"
															src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/2-80x80.jpg"
															title="Round Goggle" alt="Round Goggle" />
													</a>
													<div class="button-group">
														<button type="button" class="wishlist" data-toggle="tooltip"
															title="Add To WishList" onclick="wishlist.add('48');"><i
																class="icon-heart"></i></button>
														<button type="button" data-toggle="tooltip"
															class="quickview-button" title="Quickview"
															onclick="quickView.ajaxView('?route=product/quickview&product_id=48');"><i
																class="icon-eye"></i></button>
														<button type="button" class="compare" data-toggle="tooltip"
															title="Add To Compare" onclick="compare.add('48');"><i
																class="icon-change"></i></button>
													</div>
													<button type="button" class="addcart" title="Add to Cart"
														onclick="cart.add('48')">Add to Cart</button>
												</div>
												<div class="thumb-description clearfix">
													<div class="caption">
														<h4 class="product-title"><a
																href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/product&amp;product_id=48">Round
																Goggle</a></h4>
														<p class="price">
															$122.00
														</p>
														<div class="rating">
															<span class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="product-layout  col-xs-12">
											<div class="product-thumb transition clearfix">
												<div class="image">
													<a
														href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/product&amp;product_id=33">
														<img src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/10-80x80.jpg"
															alt="Goggle" title="Goggle" class="img-responsive" />
														<img class="img-responsive hover-img"
															src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/10-80x80.jpg"
															title="Goggle" alt="Goggle" />
													</a>
													<div class="sale-text"><span class="section-sale">-20%</span></div>
													<div class="button-group">
														<button type="button" class="wishlist" data-toggle="tooltip"
															title="Add To WishList" onclick="wishlist.add('33');"><i
																class="icon-heart"></i></button>
														<button type="button" data-toggle="tooltip"
															class="quickview-button" title="Quickview"
															onclick="quickView.ajaxView('?route=product/quickview&product_id=33');"><i
																class="icon-eye"></i></button>
														<button type="button" class="compare" data-toggle="tooltip"
															title="Add To Compare" onclick="compare.add('33');"><i
																class="icon-change"></i></button>
													</div>
													<button type="button" class="addcart" title="Add to Cart"
														onclick="cart.add('33')">Add to Cart</button>
												</div>
												<div class="thumb-description clearfix">
													<div class="caption">
														<h4 class="product-title"><a
																href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/product&amp;product_id=33">Goggle</a>
														</h4>
														<p class="price">
															<span class="price-new">$98.00</span><span
																class="price-old">$122.00</span>
														</p>
														<div class="rating">
															<span class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star-o fa-stack-2x"></i></span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="product-layout  col-xs-12">
											<div class="product-thumb transition clearfix">
												<div class="image">
													<a
														href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/product&amp;product_id=47">
														<img src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/11-80x80.jpg"
															alt="Sneakers" title="Sneakers" class="img-responsive" />
														<img class="img-responsive hover-img"
															src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/11-80x80.jpg"
															title="Sneakers" alt="Sneakers" />
													</a>
													<div class="button-group">
														<button type="button" class="wishlist" data-toggle="tooltip"
															title="Add To WishList" onclick="wishlist.add('47');"><i
																class="icon-heart"></i></button>
														<button type="button" data-toggle="tooltip"
															class="quickview-button" title="Quickview"
															onclick="quickView.ajaxView('?route=product/quickview&product_id=47');"><i
																class="icon-eye"></i></button>
														<button type="button" class="compare" data-toggle="tooltip"
															title="Add To Compare" onclick="compare.add('47');"><i
																class="icon-change"></i></button>
													</div>
													<button type="button" class="addcart" title="Add to Cart"
														onclick="cart.add('47')">Add to Cart</button>
												</div>
												<div class="thumb-description clearfix">
													<div class="caption">
														<h4 class="product-title"><a
																href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/product&amp;product_id=47">Sneakers</a>
														</h4>
														<p class="price">
															$122.00
														</p>
														<div class="rating">
															<span class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star-o fa-stack-2x"></i></span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="product-layout  col-xs-12">
											<div class="product-thumb transition clearfix">
												<div class="image">
													<a
														href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/product&amp;product_id=30">
														<img src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/10-80x80.jpg"
															alt="Aviator Classic" title="Aviator Classic"
															class="img-responsive" />
														<img class="img-responsive hover-img"
															src="https://opencart.mahardhi.com/MT04/noriva/05/image/cache/catalog/products/4-80x80.jpg"
															title="Aviator Classic" alt="Aviator Classic" />
													</a>
													<div class="sale-text"><span class="section-sale">-5%</span></div>
													<div class="button-group">
														<button type="button" class="wishlist" data-toggle="tooltip"
															title="Add To WishList" onclick="wishlist.add('30');"><i
																class="icon-heart"></i></button>
														<button type="button" data-toggle="tooltip"
															class="quickview-button" title="Quickview"
															onclick="quickView.ajaxView('?route=product/quickview&product_id=30');"><i
																class="icon-eye"></i></button>
														<button type="button" class="compare" data-toggle="tooltip"
															title="Add To Compare" onclick="compare.add('30');"><i
																class="icon-change"></i></button>
													</div>
													<button type="button" class="addcart" title="Add to Cart"
														onclick="cart.add('30')">Add to Cart</button>
												</div>
												<div class="thumb-description clearfix">
													<div class="caption">
														<h4 class="product-title"><a
																href="card.html">Aviator
																Classic</a></h4>
														<p class="price">
															<span class="price-new">$116.00</span><span
																class="price-old">$122.00</span>
														</p>
														<div class="rating">
															<span class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star fa-stack-2x"></i><i
																	class="fa fa-star-o fa-stack-2x"></i></span> <span
																class="fa fa-stack"><i
																	class="fa fa-star-o fa-stack-2x"></i></span>
															<span class="fa fa-stack"><i
																	class="fa fa-star-o fa-stack-2x"></i></span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
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
				<h2 class="page_title">{{$category ? ucwords($category->name) : 'All Category'}}</h2>
				<div class="row">
					<div class="col-sm-12">
						@if(!is_null($category))
							<img src="{{ asset('category_images/'.$category->image) }}"
							alt="Shop" title="Shop" class="img-thumbnail cat-banner" />
						@else
							<img src="{{ asset('images/default-cover.JPG') }}"
							alt="Shop" title="Shop" class="img-thumbnail cat-banner" />
						@endif	
						</div>
					<div class="col-sm-12 cat-description">
						<p>
							Shop Laptop feature only the best laptop deals on the market. By comparing laptop deals from
							the
							likes of PC World, Comet, Dixons, The Link and Carphone Warehouse, Shop Laptop has the most
							comprehensive selection of laptops on the internet. At Shop Laptop, we pride ourselves on
							offering
							customers the very best laptop deals. From refurbished laptops to netbooks, Shop Laptop
							ensures that
							every laptop - in every colour, style, size and technical spec - is featured on the site at
							the
							lowest possible price.</p>
					</div>
				</div>
				<!-- <div class="refine-search">
					<h3 class="refine-text">Recent Search</h3>
					<div class="row">
						<div class="col-sm-12">
							<ul class="cat-name">
								<li><a
										href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18_41">KIds</a>
								</li>
								<li><a
										href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18_48">Party
										Wear</a></li>
								<li><a
										href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18_69">Shoes</a>
								</li>
								<li><a
										href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18_45">Pants</a>
								</li>
								<li><a
										href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18_46">Shirts</a>
								</li>
							</ul>
						</div>
					</div>
				</div> -->

				<div class="cat_info">
					<div class="row">
						<div class="col-sm-2 col-xs-5 cat_list_gird">
							<div class="btn-group btn-group-sm">
								<button type="button" id="grid-view" class="btn btn-default" data-toggle="tooltip"
									title="Grid"><i class="icon-grid"></i></button>
								<!-- <button type="button" id="list-view" class="btn btn-default" data-toggle="tooltip"
									title="List"><i class="icon-list"></i>
								</button> -->
							</div>
						</div>
						<div class="col-sm-3 col-xs-6 com-total">
							<!-- <a href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/compare"id="compare-total" class="btn btn-link">Product Compare (0)</a> -->
						</div>
						<div class="col-sm-7 col-xs-12 cat-pagination-right">
							<div class="cat-sort">
								<div class="text-right show-text clearfix">
									<label class="control-label text_sort" for="input-sort">Sort By:</label>
								</div>
								<div class="text-right show-select clearfix">
									<div class="select-filter-sort">
										<select id="input-sort" class="form-control sort-order"
											onchange="location = this.value;">
											<option>A to Z</option>
										</select>
									</div> 
								</div>
							</div>
							<!-- <div class="cat-show">
								<div class="text-right show-text clearfix">
									<label class="control-label text_limit" for="input-limit">Show:</label>
								</div>
								<div class="text-right show-select clearfix">
									<div class="select-filter-show">
										<select id="input-limit" class="form-control limits-text"
											onchange="location = this.value;">
											<option
												value="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18&amp;limit=12"
												selected="selected">12</option>
											<option
												value="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18&amp;limit=25">
												25</option>
											<option
												value="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18&amp;limit=50">
												50</option>
											<option
												value="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18&amp;limit=75">
												75</option>
											<option
												value="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/category&amp;path=18&amp;limit=100">
												100</option>
										</select>
									</div>
								</div>
							</div> -->
						</div>
					</div>
				</div>
				<div class="row category-row">
					@foreach($products as $product)
					<div class="product-layout product-list col-xs-12">
						<div class="product-thumb">
							<div class="image" style="">
								<a
									href="{{ route('single', $product->id) }}" target="_blank">
									<img src="{{ asset('product_images/'.$product->image) }}"
										alt="Black Cap" title="Black Cap" class="img-responsive" />
									<img class="img-responsive hover-img"
										src="{{ asset('product_images/'.$product->image) }}"
										title="Black Cap" alt="Black Cap" />
								</a>
								<!-- <div class="button-group">
									<button type="button" class="wishlist" data-toggle="tooltip" title="Add To WishList"
										onclick="wishlist.add('41');"><i class="icon-heart"></i></button>
									<button type="button" data-toggle="tooltip" class="quickview-button"
										title="Quickview"
										onclick="quickView.ajaxView('?route=product/quickview&product_id=41');"><i
											class="icon-eye"></i></button>
									<button type="button" class="compare" data-toggle="tooltip" title="Add To Compare"
										onclick="compare.add('41');"><i class="icon-change"></i></button>
								</div> -->
								<a href="{{ route('single', $product->id) }}" class="addcart" title="Add to Cart" style="background: #000; color: #f6f9fc;">Add to Cart</a>
							</div>
							<div class="thumb-description clearfix">
								<div class="caption">
									<h4 class="product-title"><a
											href="{{ route('single', $product->id) }}" target="_blank">{{ $product->name }}</a></h4>
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
									<p class="description">Just when you thought iMac had everything, now there´s even
										more.
										More powerful Intel Core 2 Duo processors. And more memory standard. Combine
										this with
										Mac OS X Leopard and iLife ´08, and it´s more a..</p>
									<button type="button" class="addcart" title="Add to Cart"
										onclick="cart.add('41')">Add to
										Cart</button>
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