@extends('layouts.home')
@section('content')
<div class="page-title-overlap bg-dark pt-4"> 
  <div class="container d-lg-flex justify-content-between py-2 py-lg-3">
    <div class="mb-3 mb-lg-0 pt-lg-2">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start"> 
          <li class="breadcrumb-item">
            <a class="text-nowrap text-white" href="#">
              {{ ucwords(getCategory($product->grand_category_id)->name) }}
            </a>
          </li>
        @if(!is_null($product->parent_category_id))
          <li class="breadcrumb-item text-nowrap text-white"> 
            <a href="#">
                {{ ucwords(getCategory($product->parent_category_id)->name) }}
            </a>
          </li>
        @endif
        @if(!is_null($product->category_id))
          <li class="breadcrumb-item text-nowrap text-white">
            <a href="#">
              {{ ucwords(getCategory($product->category_id)->name) }}
            </a>
          </li>
        @endif
        </ol>
      </nav>
    </div>
  </div>
</div>

<div id="product-page" class="container">
  <div class="row">
    <div id="content" class="col-sm-12" style="background-color: aliceblue;">
      <!-- <h2 class="page_title">{{ucwords($product->name)}}</h2> -->
      <div class="pro-deatil row">
        <div class="col-sm-6 product-img" style="margin-top: 20px">
          <div class="thumbnails">
            <div class="product-additional">
              <div id="additional-carousel" class="slick-carousel clearfix">
                <div class="image-additional">
                  <a href="{{ asset('product_images/'.$product->image) }}"
                    title="Aviator Classic" class="elevatezoom-gallery"
                    data-image="{{ asset('product_images/'.$product->image) }}"
                    data-zoom-image="{{ asset('product_images/'.$product->image) }}">
                    <img src="{{ asset('product_images/'.$product->image) }}"
                      title="Aviator Classic" alt="Aviator Classic" width="80" height="80" />
                  </a>
                </div>
                <!-- related images -->
                @foreach( getOtherProductImages($product->id) as $key => $image )
                <div class="image-additional">
                  <a href="{{ asset('product_images/'.$image->image) }}"
                    title="Aviator Classic" class="elevatezoom-gallery"
                    data-image="{{ asset('product_images/'.$image->image) }}"
                    data-zoom-image="{{ asset('product_images/'.$image->image) }}">
                    <img src="{{ asset('product_images/'.$image->image) }}"
                      title="Aviator Classic" alt="Aviator Classic" width="80" height="80" />
                  </a>
                </div>
                @endforeach
              </div>
            </div>
            <div class="pro-image">
              <a href="{{ asset('product_images/'.$product->image) }}"
                title="Aviator Classic" class="thumbnail ">
                <img src="{{ asset('product_images/'.$product->image) }}"
                  title="Aviator Classic" id="" alt="Aviator Classic"
                  data-zoom-image="{{ asset('product_images/'.$product->image) }}" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 right_info" style="margin-top: 20px">
          <h1 class="">{{ucwords($product->name)}}</h1>
          <div class="rating clearfix">
            <div class="product-rating">
              <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i
                  class="fa fa-star-o fa-stack-1x"></i></span>
              <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i
                  class="fa fa-star-o fa-stack-1x"></i></span>
              <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i
                  class="fa fa-star-o fa-stack-1x"></i></span>
              <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i></span> <span
                class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i></span>
            </div>
            <a href="" class="reviews"
              onclick="$('a[href=\'#tab-review\']').trigger('click'); $('body,html').animate({scrollTop: $('.nav-tabs').offset().top}, 800); return false;">1
              reviews</a>
            <a href="" class="write-review"
              onclick="$('a[href=\'#tab-review\']').trigger('click'); $('body,html').animate({scrollTop: $('.nav-tabs').offset().top}, 800); return false;"><i
                class="fa fa-pencil" aria-hidden="true"></i>Write a review</a>
          </div>
          <hr>
          <ul class="list-unstyled">
            <li><span class="disc">Brand:</span> <a class="disc1"
                href="https://opencart.mahardhi.com/MT04/noriva/05/index.php?route=product/manufacturer/info&amp;manufacturer_id=9">Canon</a>
            </li>
            <li><span class="disc">Product Code:</span><span class="disc1"> Product 3</span></li>
            <li><span class="disc">Reward Points:</span><span class="disc1"> 200</span></li>
            <li><span class="disc">Availability:</span><span class="disc1"> In Stock</span></li>
          </ul>
          <hr>
          <ul class="list-unstyled">
            <li>
              <span class="pro_price">₹{{ $product->offer_price }}</span><span class="pro_oldprice"
                style="text-decoration: line-through;">₹{{ $product->mrp }}</span>
            </li>
            <li class="tax">Ex Tax: ₹95.00</li>
          </ul>
          <hr>
          <form action="{{ route('addtocart') }}" method="post">
            <div id="product" class="product-options">
              <h3>Available Options</h3>
              <input type="hidden" name="product_id" value="{{ $product->id }}">
              @foreach($product_attributes as $key => $value)            
              <div class="fs-sm">
                <span class="text-heading fw-medium me-1">
                  Select {{$key}}
                  <div class="position-relative me-n4 mt-2">
                  @foreach($value as $k => $v)
                    <div class="form-check form-option form-check-inline mb-2">
                      <input class="form-check-input" type="radio" name="attribute[{{strtolower($key)}}]" id="{{strtolower($key)}}{{$k}}" data-bs-label="colorOption" value="{{$v->value}}" {{ $k==0 ? 'checked' : '' }}>
                      <label class="form-option-label" for="{{strtolower($key)}}{{$k}}">
                        <span class="">{{$v->value}}</span>
                      </label>
                    </div>
                    
                  @endforeach
                  </div>
                </span>
                <!-- <span class="text-muted" id="colorOption">
                </span> -->
              </div>
              @endforeach
              <!-- <div class="form-group required ">
                <label class="control-label" for="input-option226">Select</label>
                <select name="option[226]" id="input-option226" class="form-control">
                  <option value=""> --- Please Select --- </option>
                  <option value="16">Blue
                  </option>
                </select>
              </div> -->
                <div class="form-group">
                  <label class="control-label qty" for="input-quantity">Qty</label>
                  <div class="product-btn-quantity">
                    <div class="minus-plus">
                      <button class="minus"><i class="fa fa-minus"></i></button>
                      <input type="text" name="quantity" value="1" size="2" id="input-quantity"
                        class="form-control" />
                      <button class="plus"><i class="fa fa-plus"></i></button>
                    </div>
                  </div>
                  <!-- <input type="hidden" name="product_id" value="30" /> -->
                  @csrf
                  <div class="btn-group">
                    @php
                      {{ $is_in_cart=false; }}
                      @endphp
                      @foreach( getCartProducts() as $value )
                        @if($value->id==$product->id)
                          @php
                          {{ $is_in_cart=true;break; }}
                          @endphp
                        @endif
                      @endforeach

                      @if($is_in_cart)
                        <a class="btn btn-primary btn-shadow d-block w-100" href="{{ route('cart') }}">
                          Go to cart<i class="ci-arrow-right fs-lg me-2"></i>
                        </a>
                      @else
                        <button type="submit" class="btn btn-primary btn-lg">Add to Cart</button>
                      @endif  


                    <button type="button" class="pro_wish" title="Add To WishList"
                      onclick="wishlist.add('30');"><i class="icon-heart"></i></button>
                    <button type="button" class="pro_comper" title="Add To Compare"
                      onclick="compare.add('30');"><i class="icon-change"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </form>
          <hr>
          <!-- AddThis Button BEGIN -->
          <!-- <div class="addthis_toolbox addthis_default_style"
            data-url="">
            <a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>
            <a class="addthis_button_tweet"></a>
            <a class="addthis_button_pinterest_pinit"></a>
            <a class="addthis_counter addthis_pill_style"></a>
          </div>
          <script type="text/javascript"
            src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-515eeaf54693130e"></script> -->
          <!-- AddThis Button END -->
        </div>
      </div>
      <div class="col-sm-12">
        <div class="row propage-tab">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#tab-description" data-toggle="tab">Description</a></li>
            <li><a href="#tab-review" data-toggle="tab">Reviews (1)</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab-description">
              <p>
                {{ $product->description }}</p>
            </div>
            <div class="tab-pane" id="tab-review">
              <form class="form-horizontal" id="form-review">
                <div id="review"></div>
                <h2>Write a review</h2>
                <div class="form-group required">
                  <div class="col-sm-2">
                    <label class="control-label" for="input-name">Your Name</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" name="name" value="" id="input-name"
                      class="form-control" />
                  </div>
                </div>
                <div class="form-group required">
                  <div class="col-sm-2">
                    <label class="control-label" for="input-review">Your Review</label>
                  </div>
                  <div class="col-sm-10">
                    <textarea name="text" rows="5" id="input-review"
                      class="form-control"></textarea>
                    <div class="help-block"><span class="text-danger">Note:</span> HTML is not
                      translated!
                    </div>
                  </div>
                </div>
                <div class="form-group required">
                  <div class="col-sm-2">
                    <label class="control-label">Rating</label>
                  </div>
                  <div class="col-sm-10">
                    &nbsp;&nbsp;&nbsp; Bad&nbsp;
                    <input type="radio" name="rating" value="1" />
                    &nbsp;
                    <input type="radio" name="rating" value="2" />
                    &nbsp;
                    <input type="radio" name="rating" value="3" />
                    &nbsp;
                    <input type="radio" name="rating" value="4" />
                    &nbsp;
                    <input type="radio" name="rating" value="5" />
                    &nbsp;Good
                  </div>
                </div>

                <div class="buttons clearfix">
                  <div class="pull-right">
                    <button type="button" id="button-review" data-loading-text="Loading..."
                      class="btn btn-primary">Continue</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="related-products-block box">
        <div class="box-content">
          <div class="page-title">
            <h3>Related Products</h3>
          </div>
          <div class="block_box row category-row">
            <div id="related-carousel" class="box-product  related-carousel  clearfix" data-items="4">
            
              @if(!is_null($rel_products) or count($rel_products)>0)
              @foreach($rel_products as $related)
                <div class="product-layout col-xs-12" style="max-height: 500px">
                  <div class="product-thumb">
                    <div class="image" >
                      <a
                        href="{{ route('single', $related->id) }}">
                        <img src="{{ asset('product_images/'.$related->image) }}"
                          alt="Party Wear Shoes" title="Party Wear Shoes"
                          class="img-responsive" />
                        <img class="img-responsive hover-img"
                          src="{{ asset('product_images/'.$related->image) }}"
                          title="{{ $related->name }}" alt="{{ $related->name }}" />
                      </a>
                      <!-- <div class="button-group">
                        <button type="button" class="wishlist" data-toggle="tooltip"
                          title="Add To WishList" onclick="wishlist.add('29');"><i
                            class="icon-heart"></i></button>
                        <button type="button" data-toggle="tooltip" class="quickview-button"
                          title="Quickview"
                          onclick="quickView.ajaxView('?route=product/quickview&product_id=29');"><i
                            class="icon-eye"></i></button>
                        <button type="button" class="compare" data-toggle="tooltip"
                          title="Add To Compare" onclick="compare.add('29');"><i
                            class="icon-change"></i></button>
                      </div> -->
                      <a href="{{ route('single', $related->id) }}" class="addcart" title="Add to Cart">Add
                        to Cart</a>
                    </div>
                    <div class="thumb-description clearfix">
                      <div class="caption">
                        <h4 class="product-title"><a
                            href="{{ route('single', $related->id) }}">{{ $related->name }}</a></h4>
                        <p class="price">
                          ₹{{ $related->offer_price }}<span class="price-old">₹{{ $related->mrp }}</span>
                          <span class="section-sale" style="color: green">
                            @php $decount = 100 * ($related->mrp - $related->offer_price) / $related->mrp; @endphp
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
                            class="fa fa-stack"><i
                              class="fa fa-star-o fa-stack-2x"></i></span> <span
                            class="fa fa-stack"><i
                              class="fa fa-star-o fa-stack-2x"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              @endforeach 
              @endif 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- M-Custom script -->
<script>
  $(document).ready(function () {
    // Additional images
    const direction = $('html').attr('dir');

    $('.related-carousel').each(function () {
      if ($(this).closest('#column-left').length == 0 && $(this).closest('#column-right').length == 0) {
        $(this).addClass('owl-carousel owl-theme');
        const items = $(this).data('items') || 4;
        const sliderOptions = {
          loop: false,
          nav: true,
          navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
          dots: false,
          items: items,
          mouseDrag: false,
          touchDrag: false,
          pullDrag: false,
          rewind: false,
          autoplay: true,
          responsiveRefreshRate: 200,
          responsive: {
            0: { items: 1 },
            320: { items: ((items - 2) > 1) ? (items - 2) : 1 },
            601: { items: ((items - 1) > 1) ? (items - 1) : 1 },
            992: { items: items }
          }
        };
        if (direction == 'rtl') sliderOptions['rtl'] = true;
        $(this).owlCarousel(sliderOptions);
      }
    });
  });

  // Additional images
  $('.slick-carousel').slick({
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1801,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $(document).ready(function () {
    if ($(window).width() > 991) {
      $("#zoom").elevateZoom({
        zoomType: "inner",
        cursor: "crosshair",
        gallery: 'additional-carousel',
        galleryActiveClass: 'active'
      });

      var image_index = 0;
      $(document).on('click', '.thumbnail', function () {
        $('.thumbnails').magnificPopup('open', image_index);
        return false;
      });

      $('#additional-carousel a').click(function () {
        var smallImage = $(this).attr('data-image');
        var largeImage = $(this).attr('data-zoom-image');
        var ez = $('#zoom').data('elevateZoom');
        $('.thumbnail').attr('href', largeImage);
        ez.swaptheimage(smallImage, largeImage);
        image_index = $(this).index('#additional-carousel a');
        return false;
      });
    } else {
      $(document).on('click', '.thumbnail', function () {
        $('.thumbnails').magnificPopup('open', 0);
        return false;
      });
    }
  });

  $(document).ready(function () {
    $('.thumbnails').magnificPopup({
      type: 'image',
      delegate: 'a.elevatezoom-gallery', // Mahardhi Edit
      gallery: {
        enabled: true
      }
    });
  });
</script>
@endsection
