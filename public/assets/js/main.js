/*global jQuery */
(function ($) {
	"use strict";

	var $window = $(window);
	$window.on('scroll', function () {
        // Sticky menu 
		var scroll = $window.scrollTop();
		if (scroll < 300) {
			$(".sticky").removeClass("is-sticky");
		} else {
			$(".sticky").addClass("is-sticky");
		}
        
        // Scroll To Top
		if ($(this).scrollTop() > 600) {
			$('.scroll-top').removeClass('not-visible');
		} else {
			$('.scroll-top').addClass('not-visible');
		}
	});

	// slide effect dropdown
	function dropdownAnimation() {
		$('.dropdown').on('show.bs.dropdown', function (e) {
			$(this).find('.dropdown-menu').first().stop(true, true).slideDown(500);
		});

		$('.dropdown').on('hide.bs.dropdown', function (e) {
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp(500);
		});
	}
	dropdownAnimation();

	// mini cart toggler
	$(".mini-cart-btn").on("click", function (event) {
		event.stopPropagation();
		event.preventDefault();
		$(".cart-list").slideToggle();
	});

	// responsive menu js
	jQuery('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "991"
	});

	// tooltip active js
	$('[data-toggle="tooltip"]').tooltip();

	//  Category Menu
	/*-- Variables --*/
	var categoryToggleWrap = $('.category-toggle-wrap');
	var categoryToggle = $('.category-toggle');
	var categoryMenu = $('.category-menu');

	/*-- Category Menu Toggles --*/
	function categorySubMenuToggle() {
		var screenSize = $window.width();
		if (screenSize <= 991) {
			$('.category-menu .menu-item-has-children > a').prepend('<span class="expand menu-expand"></span>');
			$('.category-menu .menu-item-has-children ul').slideUp();
		} else {
			$('.category-menu .menu-item-has-children > a .menu-expand').remove();
			$('.category-menu .menu-item-has-children ul').slideDown();
		}
	}
	
	$(window).on({
		load: function(){
			categorySubMenuToggle();
		},
		resize: function(){
			categorySubMenuToggle();
		}
	});

	categoryToggle.on('click', function () {
		categoryMenu.slideToggle();
	});

	// Category Sub Menu
	$('.category-menu').on('click', 'li a, li a .menu-expand', function (e) {
		var $a = $(this).hasClass('menu-expand') ? $(this).parent() : $(this);
		if ($a.parent().hasClass('menu-item-has-children')) {
			if ($a.attr('href') === '#' || $(this).hasClass('menu-expand')) {
				if ($a.siblings('ul:visible').length > 0) $a.siblings('ul').slideUp();
				else {
					$(this).parents('li').siblings('li').find('ul:visible').slideUp();
					$a.siblings('ul').slideDown();
				}
			}
		}
		if ($(this).hasClass('menu-expand') || $a.attr('href') === '#') {
			e.preventDefault();
			return false;
		}
	});

	// category Carousel For 3 row
	$('.category-carousel-active').each(function () {
		var $this = $(this);
		var $arrowContainer = $(this).siblings('.section-title-2').find('.category-append');
		var $row = $this.attr("data-row") ? parseInt($this.attr("data-row"), 10) : 1;
		$this.slick({
			infinite: true,
			arrows: true,
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			rows: $row,
			prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
			nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
			appendArrows: $arrowContainer,
			responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						rows: 3,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						rows: 3,
					}
				},
			]
		});
	});

	// featured category carousel active js
	$('.featured-carousel-active').slick({
		autoplay: false,
		infinite: true,
		fade: false,
		dots: false,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		slidesToShow: 4,
		responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			},
		]
	});

	// brand slider active js
	var brand = $('.brand-active');
	brand.slick({
		infinite: true,
		arrows: true,
		autoplay: true,
		speed: 1000,
		pauseOnFocus: false,
		pauseOnHover: false,
		slidesToShow: 5,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					arrows: false,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 2,
					arrows: false,
				}
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			},
		]
	});

	// prodct details slider active
	$('.product-large-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: true,
		asNavFor: '.pro-nav',
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
	});

	// product details slider nav active
	$('.pro-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.product-large-slider',
		centerMode: true,
		arrows: true,
		centerPadding: 0,
		focusOnSelect: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>'
	});

	// image zoom effect
	$('.img-zoom').zoom();

	// quantity change js
    var proQty = $('.pro-qty');
	proQty.prepend('<span class="dec qtybtn">-</span>');
	proQty.append('<span class="inc qtybtn">+</span>');
	proQty.on('click', '.qtybtn', function () {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
	});

	// nice select active js
	$('select').niceSelect();

	// modal fix
	$('.modal').on('shown.bs.modal', function (e) {
        e.preventDefault();
		$('.pro-nav').resize();
	});

	// product view mode change js
	$('.product-view-mode').on('click', 'a', function (e) {
		e.preventDefault();
		var shopProductWrap = $('.shop-product-wrap');
		var viewMode = $(this).data('target');
		$('.product-view-mode a').removeClass('active');
		$(this).addClass('active');
		shopProductWrap.removeClass('grid list').addClass(viewMode);
	});

	// scroll to top
	$('body').on('click', '.scroll-top', function (e) {
        e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});



const buscarListado = async () => {
	const token = localStorage.getItem('jwt-token')
  
	const res = await fetch(`/listaProductos/0`, {
	  method: 'GET',
	  headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
  
	  }
	})
  
	if (!res.ok) {
	  window.location.href = "/login.html"
  
	  throw Error("Problemas en login")
	}
  
	const data = await res.json()
  
	return data
}

const listadoProductos = async () => {
	let resultados
	let search = window.location.href.split("search=")[1]
  
	if (search != null) {
	  resultados = await busquedaProductos(search)
	}
	else {
	  resultados = await buscarListado()
	}
  
	let listaHTML = document.querySelector(`#listado`)
	listaHTML.innerHTML = ''
  
	if (resultados.length == 0) {
	  listaHTML.innerHTML = '<h1 style="color:#F4CE14; text-align: center; margin: 0 auto; width: 50%;">"No se encontraron resultados"</h1>';
  
	} else {
		resultados = resultados.concat(resultados)
		resultados = resultados.concat(resultados)

		let mostrarCantidad = document.querySelector(`#cantProductos`)
		let cantidad = resultados.length

		mostrarCantidad.innerHTML = `Mostrando 1-16 de ${cantidad} resultados`

		resultados.forEach((producto, i) => {
			listaHTML.innerHTML += ` 
				<div class="col-lg-3 col-md-4 col-sm-6">
					<div class="product-item fix mb-30">
						<div class="product-thumb">
							<a href="product-details.html">
								<img src="assets/uploads/${producto.Imagen}" class="img-pri" alt="${producto.Imagen}">
							</a>
							<div class="product-action-link">                                                
								<a href="" onclick="detalleProducto()" data-toggle="modal" data-target="#quick_view"> <span data-toggle="tooltip" data-placement="left" title="Ver"><i class="fa fa-search"></i></span> </a>
							</div>
						</div>
						<div class="product-content">
							<h4><a href="product-details.html">${producto.NombreProducto}</a></h4>
							<h3><a href="product-details.html">${producto.NombreMarca}</a></h3>
							<h4></h4>
							<div class="pricebox">
								<span class="regular-price">$${producto.PrecioVenta}</span>
							</div>
						</div>
					</div>
					<div class="product-list-item mb-30">
						<div class="product-thumb">
							<a href="product-details.html">
								<img src="assets/uploads/${producto.Imagen}" class="img-pri" alt="${producto.Imagen}">
							</a>
						</div>
						<div class="product-list-content">
							<h3><a href="product-details.html">${producto.NombreProducto}</a></h3>
							<h4><a href="product-details.html">${producto.NombreMarca}</a></h4>
							<div class="pricebox">
								<span class="regular-price">$${producto.PrecioVenta}</span>
							</div>
							<p>${producto.DescripcionProducto}</p>						
							<div class="product-list-action-link">
								<a href="#" data-toggle="modal" data-target="#quick_view"> <span data-toggle="tooltip" data-placement="top" title="Ver"><i class="fa fa-search"></i></span> </a>
							</div>
						</div>
					</div>
				</div>
			`;
	  	});
	}
}
  
listadoProductos()

}(jQuery));

const detalleProducto = async () => {
	let modal = document.getElementById("quick_view") //$("#quick_view")//document.getElementById("quick_view")	
	// modal.innerHTML =   `
    //     <div class="modal-dialog modal-lg modal-dialog-centered">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <button type="button" class="close" data-dismiss="modal">&times;</button>
    //             </div>
    //             <div class="modal-body">
    //                 <!-- product details inner end -->
    //                 <div class="product-details-inner">
    //                     <div class="row">
    //                         <div class="col-lg-5">
    //                             <div class="product-large-slider slick-arrow-style_2 mb-20">
    //                                 <div class="pro-large-img">
    //                                     <img src="assets/img/product/product-details-img1.jpg" alt="" />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div class="col-lg-7">
    //                             <div class="product-details-des mt-md-34 mt-sm-34">
    //                                 <h3><a href="product-details.html">external product 12</a></h3>
    //                                 <div class="ratings">
    //                                     <span class="good"><i class="fa fa-star"></i></span>
    //                                     <span class="good"><i class="fa fa-star"></i></span>
    //                                     <span class="good"><i class="fa fa-star"></i></span>
    //                                     <span class="good"><i class="fa fa-star"></i></span>
    //                                     <span><i class="fa fa-star"></i></span>
    //                                     <div class="pro-review">
    //                                         <span>1 review(s)</span>
    //                                     </div>
    //                                 </div>
    //                                 <div class="availability mt-10">
    //                                     <h5>Availability:</h5>
    //                                     <span>1 in stock</span>
    //                                 </div>
    //                                 <div class="pricebox">
    //                                     <span class="regular-price">$160.00</span>
    //                                 </div>
    //                                 <p>Lssdfsgfgg gdfgsdfg</p>
    //                                 <div class="quantity-cart-box d-flex align-items-center mt-20">
    //                                     <div class="quantity">
    //                                         <div class="pro-qty"><input type="text" value="1"></div>
    //                                     </div>
    //                                     <div class="action_link">
    //                                         <a class="buy-btn" href="#">add to cart<i class="fa fa-shopping-cart"></i> </a>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
	// `
}

