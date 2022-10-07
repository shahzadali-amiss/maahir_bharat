let prevWidth = null;

(function ($) {
	"use strict";
	/*----------------------------------------------*/
	/* Loader  */
	/*----------------------------------------------*/	
	$(window).on("load", function () {
		$('.loader').fadeOut('slow',function(){
			$(this).remove();
		});
	});

	/*----------------------------------------------*/
	/* Menu Button click */
	/*----------------------------------------------*/
	$(document).ready(function() {
		// set column+content
		updateColumnsAndContent();
		// clikc events
		clickEventsInCategoryPage();

		// actions
		footerExplanCollapse();

		$(window).resize(function () {
			// set column+content
			updateColumnsAndContent();
		});
	});

	/*----------------------------------------------*/
	/* Update column+content in responsive */
	/*----------------------------------------------*/
	function updateColumnsAndContent() {
		if ($(window).width() < 992) {
			$('#column-left, #column-right').insertAfter('#content');


			// left, right
			$("#column-left .box-category .toggle-open, #column-right .box-category .toggle-open").remove();
			$("#column-left .box-category h3, #column-right .box-category h3").append("<span class='toggle-open'><i class='fa fa-chevron-down'></i></span>");

			$("#column-left .box-content .toggle-open, #column-right .box-content .toggle-open").remove();
			$("#column-left .box-content h3, #column-right .box-content h3").append("<span class='toggle-open'><i class='fa fa-chevron-down'></i></span>");

			$('#column-left ul.parent, #column-right ul.parent').hide();
			$('#column-left .filter_box, #column-right .filter_box, #column-left .block_box, #column-right .block_box, #column-left .box-content ul, #column-right .box-content ul').hide();

			// footer
			if ($(".footer-top .toggle-open").length == 0) {
				$(".footer-top h5").append("<span class='toggle-open'><i class='fa fa-chevron-down'></i></span>");
				$('.footer-top ul.list-unstyled').hide();
			}
		} else {
			$('#column-right').insertAfter('#content');
			$('#column-left').insertBefore('#content');

			// menu
			// $("#menu .dropdown.menulist .toggle-menu").remove();
			// $(".category-list .menu-item.dropdown .toggle-menu").remove();
			// $('#topCategoryList').show();
			// $('#topCategoryList ul.sub-menu').removeAttr("style");
			// $('#topCategoryList div.dropdown-menu').css("display", "");

			// left, right
			$("#column-left .box-category .toggle-open, #column-left .box-content .toggle-open").remove();
			$("#column-right .box-category .toggle-open, #column-right .box-content .toggle-open").remove();
			$('#column-left ul.parent, #column-right ul.parent').show();
			$('#column-left .filter_box, #column-right .filter_box, #column-left .block_box, #column-right .block_box, #column-left .box-content ul, #column-right .box-content ul').show();

			// footer
			$(".footer-top .toggle-open").remove();
			$('.footer-top ul.list-unstyled').show();
		}

		// menu
			if ($("#menu .dropdown.menulist .toggle-menu").length == 0) {
				$("#menu .dropdown.menulist").append("<span class='toggle-menu'><i class='fa fa-plus'></i></span>");
				$("#menu .dropdown.menulist .dropdown-submenu.sub-menu-item").append("<span class='toggle-menu'><i class='fa fa-plus'></i></span>");

				$('#topCategoryList ul.sub-menu').removeAttr("style");
				$('#topCategoryList div.dropdown-menu').removeAttr("style");

				$('#topCategoryList').hide();

				// call explan-collapse
				responsiveMenuExpandCollapse();
			}
	}

	/*----------------------------------------------*/
	/* Click events in category page */
	/*----------------------------------------------*/
	function clickEventsInCategoryPage() {
		$('.box-category .toggled').click(function(e) {
			e.preventDefault();
			if ($(window).width() < 992) {
				$(this).toggleClass('active');
				$(this).parent().find('ul.parent').toggleClass('active').slideToggle('slow');
			}
		});

		$('#column-left .box-content .toggled').click(function(e) {
			e.preventDefault();
			if ($(window).width() < 992) {
				$(this).toggleClass('active');
				if ($(this).parent().find('ul').length != 0) {
					$(this).parent().find('ul').toggleClass('active').slideToggle('slow');
				} else {
					$(this).parent().find('.filter_box').toggleClass('active').slideToggle('slow');
					$(this).parent().find('.block_box').toggleClass('active').slideToggle('slow');
				}
			}
		});
		$('#column-right .box-content .toggled').click(function(e) {
			e.preventDefault();
			if ($(window).width() < 992) {
				$(this).toggleClass('active');
				if ($(this).parent().find('ul').length != 0) {
					$(this).parent().find('ul').toggleClass('active').slideToggle('slow');
				} else {
					$(this).parent().find('.filter_box').toggleClass('active').slideToggle('slow');
					$(this).parent().find('.block_box').toggleClass('active').slideToggle('slow');
				}
			}
		});
	}

	/*----------------------------------------------*/
	/* Responsive menu */
	/*----------------------------------------------*/
	function responsiveMenuExpandCollapse() {
		// expand-collapse
		$('#topCategoryList .dropdown.menulist .toggle-menu').click(function(e) {
			e.preventDefault();
			if($(this).parent().find('> ul.sub-menu').length != 0) {
				$(this).parent().find('> ul.sub-menu').slideToggle('slow');
			} else {
				$(this).parent().find('> div.dropdown-menu').slideToggle('slow');
			}
			$(this).parent().toggleClass('active');
			$(this).toggleClass('active');
			return false;
		});
	}

	/*----------------------------------------------*/
	/* Footer Toggle */
	/*----------------------------------------------*/
	function footerExplanCollapse() {
		$(".footer-top h5").addClass('toggled');
		$('.footer-top .toggled').click(function(e) {
			e.preventDefault();
			if ($(window).width() < 992) {
				$(this).toggleClass('active');
				$(this).parent().find('ul').toggleClass('active').toggle('slow');
			}
		});
	}
	
	/*----------------------------------------------*/
	/* Category page active current page category */
	/*----------------------------------------------*/
	$(function () {
		setNavigation();
	});

	function setNavigation() {
		var currentHref = window.location.href;
		$("#selectMe-desk li a").each(function () {
			var href = $(this).attr('href');
			if (currentHref === href) {
				if ($(this).parents('.has-more-category')) {
					$(this).parents('.has-more-category').find('a.list-group-item.main-item').addClass('active');
					$(this).parents('.has-more-category').find('.group').css("display","block");
				}
				$(this).addClass('active');
				$(this).parent().find('.group').css("display","block");
			}
		});
	}

	$(document).ready(function() {	
		$('.html3, .special').wrapAll("<div class='html-special mt-80 clearfix'><div class='container'><div class='row'></div></div></div>");	
		// Slider
		setProductCarousel();
		// pagetitle
		setPageTitle();
		// breadcrumb
		addbredcumb();
		// Back to top
		backToTop();
		// set alert in all page
		setalert();
		// responsive menu
		responsivemenu();
		// responsive header
		responsiveheader();
	});

	$(window).resize(function(){
		// responsive header
		responsiveheader();
	});

	/*----------------------------------------------*/
	/* Breadcrumb */
	/*----------------------------------------------*/
	function addbredcumb() {
		// $('.breadcrumb').insertAfter('header');
		$('.breadcrumb').wrap("<div class='breadcrumb-back'><div class='container'></div></div>");
		$('.breadcrumb-back').insertAfter('header');
	}
	$(function(){
		if ( $('ul.breadcrumb li').length == 2 ) {
			var last_val=$('ul.breadcrumb').children('li').last().text();
			var link_val =$('ul.breadcrumb li:last-child a').attr('href');
		}
	});

	/*----------------------------------------------*/
	/* set page title */
	/*----------------------------------------------*/
	function setPageTitle() {
		$('#content > h2,#content > h1').addClass("page_title");
	}

	/*----------------------------------------------*/
	/* Slider for product */
	/*----------------------------------------------*/
	function setProductCarousel() {
		const direction = $('html').attr('dir');
		$('.product-carousel').each(function () {
			if ($(this).closest('#column-left').length == 0 && $(this).closest('#column-right').length == 0) {
				$(this).addClass('owl-carousel owl-theme');
				const items = $(this).data('items') || 3;
				const sliderOptions = {
					loop: false,
					rewind: false,
					autoplay: false,
					autoplayTimeout: 3000,
					nav: true,
					mouseDrag: true,
        			touchDrag: true,
					navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
					dots: false,
					items: items,
					responsiveRefreshRate: 200,
					responsive: {
						0: { items: 1 },
						320: { items: ((items - 1) > 1) ? (items - 1) : 1 },
						601: { items: items }
					}
				};
				if (direction == 'rtl') sliderOptions['rtl'] = true;
				$(this).owlCarousel(sliderOptions);
			}
		});
	}

	/*----------------------------------------------*/
	/* Back to top function */
	/*----------------------------------------------*/
	function backToTop() {
		//Check to see if the window is top if not then display button
		$(".scrollToTop").hide();
		$(window).scroll(function(){
			if ($(this).scrollTop() > 250) {
				$('.scrollToTop').fadeIn();
			} else {
				$('.scrollToTop').fadeOut();
			}
		});
		//Click event to scroll to top
		$('.scrollToTop').click(function(){
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
	}	

	/*----------------------------------------------*/
	/* setalert */
	/*----------------------------------------------*/
	function setalert() {
		$('<button type="button" class="close" data-dismiss="alert">&times;</button>').appendTo('.alert.alert-dismissible');	
	}
	
	/*----------------------------------------------*/
	/* set responsivemenu */
	/*----------------------------------------------*/
	function responsivemenu(){
		$('#btnMenuBar').on("click",function(){
		    $(this).toggleClass('open-menu');
		    $('body').addClass("active");
		    var openmenu = $(this).hasClass('open-menu');
		    if(openmenu){
				$(this).parents('body') .find( '#menu .menu-navbar' ) .addClass('box-menu');
		    }
		    else
		    {
				$(this).parents('body') .find( '#menu .menu-navbar' ) .removeClass('box-menu');
		    }
		    $(".header-cart-toggle, .account-link-toggle, .language-dropdown, .currency-dropdown").css( 'display','none' );
	  	});
		$('.menu-close i').on("click", function(){
		    $('body').removeClass("active");
		    $(this).parents('body') .find( '#menu .menu-navbar' ) .removeClass('box-menu');
		    $(this).parents('body').find( '#btnMenuBar' ).removeClass('open-menu');
	  	});
	}

	/*----------------------------------------------*/
	/* Set header(991) */
	/*----------------------------------------------*/
	function responsiveheader(){
		if (prevWidth != $(window).width()) {
			if ($(window).width() <= 991) {
				$('.powered').insertAfter('.position-footer-bottom');
				$('.top-right-inner').insertBefore('.btn_search');
				$('#menu').insertAfter('.btn_search');
			}
			else{
				$('.powered').insertBefore('.payment-link');
				$('.top-right-inner').appendTo('.top-right');
				$('#menu').appendTo('.header-left');
			}			
			prevWidth = $(window).width();
		}
	}
	
	/*----------------------------------------------*/
	/* Hover zoom button */
	/*----------------------------------------------*/
	function hoverzoom() {
	    setTimeout(function () {
	      if ($(window).width() > 767) {
	        $('.hover-zoom').magnificPopup({
	          type:'image',
	       	  gallery:{
	                enabled:true,
	                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><i class="fa fa-angle-%dir% fa-4x"></i></button>'
	            }
	        });
	      }
	    }, 1000);
	}

	jQuery(document).ready(function() { hoverzoom(); });
	jQuery(window).resize(function() { hoverzoom(); });	  
	  
	/*----------------------------------------------*/
	/* Dropdown Toggle */
	/*----------------------------------------------*/
	$(function(){
		// $(".btn_search .search-btn").click(function(){
		// 	$(this).toggleClass("active");
		// 	$(".search-down").slideToggle( "2000" );
		// 	$(".language-dropdown, .header-cart-toggle, .currency-dropdown, .account-link-toggle").slideUp("slow");
		// 	return false;
	 	//  });
	 	$(".btn_search .search-btn").click(function(e){
			$(this).toggleClass("active");
			e.stopPropagation();
			$(".search-down").slideToggle( "2000" );
			$(".language-dropdown, .header-cart-toggle, .currency-dropdown, .account-link-toggle").slideUp("slow");
			return false;
	    });

	    $(".search-down").click(function(event) {
			event.stopPropagation();	
		});
	    
		$("#form-language .dropdown-toggle").click(function(){
			$(".language-dropdown").slideToggle( "2000" );
			$(".header-cart-toggle, .currency-dropdown, .account-link-toggle").slideUp("slow");
			return false;
	    });

	    $("#form-currency .dropdown-toggle").click(function(){
			$(".currency-dropdown").slideToggle( "2000" );
			$(".header-cart-toggle, .language-dropdown, .account-link-toggle").slideUp("slow");
			return false;
	    });

		$("#cart button.dropdown-toggle").click(function(){
			$(".header-cart-toggle").slideToggle( "2000" );
			$(".account-link-toggle, .currency-dropdown, .language-dropdown").slideUp("slow");
			return false;
		});		
	    $("#header_ac a.dropdown-toggle").click(function(){
			$(".account-link-toggle").slideToggle( "2000" );
			$(".header-cart-toggle, .currency-dropdown, .language-dropdown").slideUp("slow");
			return false;
	    });
    });

	$(document).on('click',function(){
		$(".account-link-toggle, .header-cart-toggle, .currency-dropdown, .language-dropdown").slideUp('slow')
	});

	/*----------------------------------------------*/
	/* more category */
	/*----------------------------------------------*/
	// $(document).ready(function(){
	//   	$(function($){
	//   		let moreText = $('#topCategoryList').data('more')
	//   		if (!moreText) { 'More' } 
	//   		var max_elem = 3;
	//   		var items = $('.navbar-nav  li.menulist');
	//   		var surplus = items.slice(max_elem, items.length);
	//   		surplus.wrapAll('<li class="menulist hiden_menu menu_drop"><div class="dropdown-inner">');
	//   		$('.hiden_menu').prepend('<a href="#" id="more_cat" class="menulist">' + moreText + '</a>');
	//   		$(window).resize(function() {
	// 		 	if($(window).width() < 992)
	// 			{
	// 				$("#topCategoryList li").removeClass( "hiden_menu");
	// 			}
	// 			else{
	// 				$("#topCategoryList li").addClass( "hiden_menu");
	// 			}
	// 		});
	//   	});
	// });	
	
	/*----------------------------------------------*/
	/* quantity seter*/
	/*----------------------------------------------*/
	$( document ).on( 'click', '.plus, .minus', function( e ) {
		e.preventDefault();
		var parent = $( this ).parents( '.product-btn-quantity' );
		var quantity = parent.find( '[name="quantity"]' );
		var val = quantity.val();
		if ( $( this ).hasClass( 'plus' ) ) {
			val = parseInt( val ) + 1;
		} else {
			if(val == 1) {
				val = 1;
			}
			else {
				val = val >= 1 ? parseInt( val ) - 1 : 0;
			}
		}
		quantity.val( val );
		quantity.trigger("change");
		return false;
	});

	/*----------------------------------------------*/
	/ Video Cms /
	/*----------------------------------------------*/
	$(document).ready(function() {
		$('.popup-youtube').magnificPopup({
		disableOn: 320,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
		});
	});
	
})(jQuery);