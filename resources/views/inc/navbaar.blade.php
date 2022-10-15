<nav id="top" style="margin-bottom: 0;"> 
    <!-- <div class="max-container"> -->
    <div class="container">
        <div class="header-top">  
            <div class="top-left">
                <!-- start menu -->
                <nav id="menu" class="navbar navbar_menu">
                    <div class="navbar-header">
                        <button type="button" class="btn btn-navbar navbar-toggle" id="btnMenuBar">
                            <i class="fa fa-bars" aria-hidden="true"></i>
                            <span class="text-menu hidden-xs hidden-sm">
                                <!-- Mahir Bharat -->
                                <a href="{{ route('guest-home') }}">
                                  <img class="site_logo" id="logo" src="{{ asset('img/logo-dark.png') }}" alt="MAAHIR BHARAT" style="max-width: 200px;">
                                </a>
                            </span>
                        </button>
                    </div>
                    <div id="topCategoryList" class="main-menu menu-navbar clearfix" data-more="More">
                        <div class="menu-close"><span id="category" class="">Mahir Bharat</span>
                        {{-- @if(!session()->has('supplier.id'))
                        <div class="navbar-header sup-menu-button">
                            <a class="btn btn-danger " href="{{ route('become-a-supplier') }}">Become a Supplier
                            </a>
                        </div>
                        @endif --}}
                            <i class="icon-close"></i>
                         
                        </div>
                        @if(!session()->has('supplier.id'))
                        <div class="navbar-header text-center sup-menu-button">
                            <a class="btn btn-danger " href="{{ route('become-a-supplier') }}">Become a Supplier
                            </a>
                        </div>
                        @endif
                        <ul class="nav navbar-nav">
                            <li class="menulist home"><a id="home" href="{{route('guest-home')}}">Home</a></li>
                            <li class="menulist home"><a id="" href="{{ route('all-products') }}">Shop</a></li>
                            <!-- <h4>Category</h4> -->

                            @foreach($grands as $grand)
                            <li class="{{ count($parents->where('parent_id', $grand->id)) >0 ? 'dropdown menulist' : ''}}">
                                <a {{ count($parents->where('parent_id', $grand->id)) >0 ? '' : "href=".route('products', $grand->id).""}} class="dropdown-toggle" aria-expanded="false">{{ $grand->name }}</a>
                                <div class="dropdown-menu navcol-menu item-column column-3">
                                    <div class="dropdown-inner">
                                        
                                        <ul class="list-unstyled childs_1">
                                            @foreach($parents as $pr)
                                                @if($pr->parent_id == $grand->id)
                                                <li class="{{ count($childs->where('parent_id', $pr->id)) >0 ? 'dropdown-submenu sub-menu-item' : ''}}">
                                                    <a href="{{ route('products', [$grand->id,$pr->id]) }}" class="{{ count($childs->where('parent_id', $pr->id)) >0 ? 'dropdown-toggle' : ''}}" aria-expanded="false">{{ $pr->name }}</a>
                                                    <ul class="list-unstyled {{ count($childs->where('parent_id', $pr->id)) >0 ? 'sub-menu' : ''}}">
                                                    @foreach($childs as $ch)
                                                        @if($ch->parent_id == $pr->id)
                                                            <li>
                                                                <a href="{{ route('products', [$grand->id,$pr->id,$ch->id]) }}">{{$ch->name}}</a>
                                                            </li>
                                                            @endif
                                                        @endforeach
                                                    </ul>
                                                </li>
                                                @endif
                                            @endforeach
                                            <!-- <li class="dropdown-submenu sub-menu-item">
                                                <a href="indexf62a.html?route=product/category&amp;path=18_48" class="dropdown-toggle" aria-expanded="false">Party Wear</a>
                                                <ul class="list-unstyled sub-menu">
                                                    <li>
                                                        <a href="index5db3.html?route=product/category&amp;path=48_42">Jogers</a>
                                                    </li>
                                                    <li>
                                                        <a href="index1041.html?route=product/category&amp;path=48_50">Pearls</a>
                                                    </li>
                                                    <li>
                                                        <a href="index4234.html?route=product/category&amp;path=48_44">Trousers</a>
                                                    </li>
                                                </ul>
                                            </li> -->
                                        </ul>
                                        
                                        <!-- <ul class="list-unstyled childs_1">
                                            <li class="dropdown-submenu sub-menu-item">
                                                <a href="index116e.html?route=product/category&amp;path=18_69" class="dropdown-toggle" aria-expanded="false">Shoes</a>
                                                <ul class="list-unstyled sub-menu">
                                                    <li>
                                                        <a href="index4acc.html?route=product/category&amp;path=69_70">Formal</a>
                                                    </li>
                                                    <li>
                                                        <a href="index9e90.html?route=product/category&amp;path=69_71">Party </a>
                                                    </li>
                                                    <li>
                                                        <a href="index1b22.html?route=product/category&amp;path=69_72">Sport</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="dropdown-submenu sub-menu-item">
                                                <a href="index8470.html?route=product/category&amp;path=18_45" class="dropdown-toggle" aria-expanded="false">Pants</a>
                                                <ul class="list-unstyled sub-menu">
                                                    <li>
                                                        <a href="index7e3a.html?route=product/category&amp;path=45_74">Brand</a>
                                                    </li>
                                                    <li>
                                                        <a href="index2b34.html?route=product/category&amp;path=45_62">Capri</a>
                                                    </li>
                                                    <li>
                                                        <a href="index7823.html?route=product/category&amp;path=45_60">Formal Pent</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <ul class="list-unstyled childs_1">
                                            <li class="dropdown-submenu sub-menu-item">
                                                <a href="index9f41.html?route=product/category&amp;path=18_46" class="dropdown-toggle" aria-expanded="false">Shirts</a>
                                                <ul class="list-unstyled sub-menu">
                                                    <li>
                                                        <a href="indexea9c.html?route=product/category&amp;path=46_59">Half Shirt</a>
                                                    </li>
                                                    <li>
                                                        <a href="index22f9.html?route=product/category&amp;path=46_61">Long Shirt</a>
                                                    </li>
                                                    <li>
                                                        <a href="index7914.html?route=product/category&amp;path=46_73">Short Shirt</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul> -->
                                    </div>
                                </div>
                            </li>
                            @endforeach 
                            <!-- <li class="dropdown menulist">
                                <a href="index98dc.html?route=product/category&amp;path=20" class="dropdown-toggle" aria-expanded="false">Jackets</a>
                                <div class="dropdown-menu navcol-menu column-1">
                                    <div class="dropdown-inner">
                                        <ul class="list-unstyled childs_1">
                                            <li class="">
                                                <a href="index6185.html?route=product/category&amp;path=20_58" class="dropdown-toggle" aria-expanded="false">Puffer Jacket</a>
                                            </li>
                                            <li class="">
                                                <a href="index3e5e.html?route=product/category&amp;path=20_47" class="dropdown-toggle" aria-expanded="false">Quilted Jacket</a>
                                            </li>
                                            <li class="">
                                                <a href="index6096.html?route=product/category&amp;path=20_49" class="dropdown-toggle" aria-expanded="false">Textured Jacket</a>
                                            </li>
                                            <li class="">
                                                <a href="indexd9fe.html?route=product/category&amp;path=20_26" class="dropdown-toggle" aria-expanded="false">High-Neck Jacket</a>
                                            </li>
                                            <li class="">
                                                <a href="indexf345.html?route=product/category&amp;path=20_27" class="dropdown-toggle" aria-expanded="false">Button-Down Jacket</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li class="dropdown menulist">
                                <a href="index1647.html?route=product/category&amp;path=25" class="dropdown-toggle" aria-expanded="false">Accessories</a>
                                <div class="dropdown-menu navcol-menu column-1">
                                    <div class="dropdown-inner">
                                        <ul class="list-unstyled childs_1">
                                            <li class="">
                                                <a href="indexf3db.html?route=product/category&amp;path=25_31" class="dropdown-toggle" aria-expanded="false">Beg</a>
                                            </li>
                                            <li class="">
                                                <a href="index68a7.html?route=product/category&amp;path=25_30" class="dropdown-toggle" aria-expanded="false">Belt</a>
                                            </li>
                                            <li class="dropdown-submenu sub-menu-item">
                                                <a href="indexe177.html?route=product/category&amp;path=25_28" class="dropdown-toggle" aria-expanded="false">Business Casual</a>
                                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                <ul class="list-unstyled sub-menu">
                                                    <li>
                                                        <a href="index43ee.html?route=product/category&amp;path=28_35">Men's Shirt</a>
                                                    </li>
                                                    <li>
                                                        <a href="indexf6ce.html?route=product/category&amp;path=28_36">Women's Shirt</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="">
                                                <a href="indexc219.html?route=product/category&amp;path=25_29" class="dropdown-toggle" aria-expanded="false">Formal</a>
                                            </li>
                                            <li class="">
                                                <a href="index955a.html?route=product/category&amp;path=25_32" class="dropdown-toggle" aria-expanded="false">Zip Jacket</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li class="menulist"><a href="index70a9.html?route=product/category&amp;path=57">Women</a></li>
                            <li class="menulist"><a href="indexc957.html?route=product/category&amp;path=24">Watches</a></li>
                            <li class="menulist"><a href="index68ea.html?route=product/category&amp;path=33">Men</a></li>
                            <li class="dropdown menulist">
                                <a href="index8122.html?route=product/category&amp;path=34" class="dropdown-toggle" aria-expanded="false">Jeans</a>
                                <div class="dropdown-menu navcol-menu column-1">
                                    <div class="dropdown-inner">
                                        <ul class="list-unstyled childs_1">
                                            <li class="">
                                                <a href="index9716.html?route=product/category&amp;path=34_37" class="dropdown-toggle" aria-expanded="false">Brand</a>
                                            </li>
                                            <li class="">
                                                <a href="index6f52.html?route=product/category&amp;path=34_51" class="dropdown-toggle" aria-expanded="false">Hoodies</a>
                                            </li>
                                            <li class="">
                                                <a href="index000c.html?route=product/category&amp;path=34_55" class="dropdown-toggle" aria-expanded="false">KIds</a>
                                            </li>
                                            <li class="">
                                                <a href="indexb234.html?route=product/category&amp;path=34_53" class="dropdown-toggle" aria-expanded="false">Women Jeans</a>
                                            </li>
                                            <li class="">
                                                <a href="indexd86f.html?route=product/category&amp;path=34_38" class="dropdown-toggle" aria-expanded="false">Men Jeans</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li class="menulist"><a href="indexb329.html?route=product/category&amp;path=43">Ruff Jeans</a></li>
                            <li class="menulist"><a href="indexb152.html?route=product/category&amp;path=17">Goggles</a></li>
                            <li class="menulist"><a href="index0217.html?route=product/category&amp;path=56">Bomber Jacket</a></li>
                            <li class="menulist"><a href="indexc7ff.html?route=product/category&amp;path=52">Tshirts</a></li>
                            <li class="blog"><a href="index2852.html?route=mahardhi_blog/mahardhi_blog">Blogs</a></li> -->
                        </ul>
                    </div>
                   
                </nav>
            </div>
            <div class="top-right">
                <div class="top-right-inner">
                    
                    <!-- ONLY FOR GUEST -->
                    @if(Auth::guest())
                        <div class="navbar-header">
                            <a class="btn btn-danger sup-button" href="{{ route('become-a-supplier') }}">Become a Supplier
                            </a>
                        </div>
                    @endif

                    <!-- VISIBLE TO GUEST AND CUSTOMER ONLY -->
                    @if(Auth::guest() || Auth::user()->role == 'c')
                    <div class="header_cart">
                        <div id="cart" class="btn-group btn-block">
                            <a href="{{ route('cart') }}" class="btn btn-inverse btn-block btn-lg">
                            <span id="cart-total">
                                <span class="hidden-sm hidden-xs">My Cart
                                </span>
                                <!-- <i class="fa fa-angle-down"></i> -->
                            </span>
                            </a>
                            <!-- <ul class="dropdown-menu header-cart-toggle pull-right">
                                <li>
                                    <p class="text-center product-cart-empty">Your shopping cart is empty!</p>
                                </li>
                            </ul> -->
                        </div>
                    </div>
                    @endif
                    
                    <div id="header_ac" class="dropdown">
                        
                        <a href="indexe223.html?route=account/account" title="My Account" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-user "></i><span class="account-here hidden-sm hidden-xs">My Account</span>
                            {{-- <i class="fa fa-angle-down hidden-sm hidden-xs"></i> --}}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right toggle account-link-toggle">
                            @if(Auth::check())
                            <li>
                                @if(Auth::user()->role == 's')
                                    <a href="{{ route('seller-home') }}">Dashboard</a>
                                @elseif(Auth::user()->role == 'c')
                                    <a href="{{ route('home') }}">Dashboard</a>
                                @elseif(Auth::user()->role == 'a')
                                    <a href="{{ route('admin') }}">Dashboard</a>
                                @endif
                            </li>
                            <li>
                                <a href="{{ route('logout') }}">Logout</a>
                            </li>
                            @else
                                <a href="{{ route('login') }}">Login</a>
                            </li>
                            <li>
                                <a href="{{route('register')}}">Register</a>
                            </li>
                            @endif
                            <!-- <li><a href="indexe223.html?route=account/wishlist" id="wishlist-total" title="WishList (0)">WishList (0)</a></li> -->
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
</nav>
<script>
    <!--
        $(document).ready(function(){
            var headerfixed = 0;
            if (headerfixed == 1) {
                $(window).scroll(function () {
                    if ($(window).width() > 992) {
                        if ($(this).scrollTop() > 110) {
                            $('header').addClass('header-fixed');
                                } else {
                            $('header').removeClass('header-fixed');
                        }
                    }
                    else{
                        $('header').removeClass('header-fixed');
                    }
                });
            }
            else{
                $('header').removeClass('header-fixed');
            }
        });
</script>