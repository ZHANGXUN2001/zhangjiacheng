$(function () {

	// Disable context menu on images and other tags
	$("body").on('contextmenu', 'img, .splash, .thumbnail-link, [class^="fsr-"]', function (e) {
		return false;
	});

	// Disable image drag
	$('img, .thumbnail-link').on('dragstart', function (e) {
		e.preventDefault();
	});

	if ($('.inner-slider .slider ul, .books-slider .slider ul').length) {
		$('body').append('<i class="image-loader"></i>');
		$('.inner-slider .slider ul, .books-slider .slider ul').css({
			opacity: 0
		});
	}

	resize_slider();

	$('.slider img').fullscreener();

	if ($(".books-slider").length) {

		$('.outer-wrap').removeClass('nav-expanded');

		$('.homepage .navigation > ul, .inner-slider .navigation > ul').animate({
			left: -220
		}, 0);

		$('.logo span').not('.letter-t, .letter-w').removeClass('flip');

		$('.letter-q').css({
			left: 31,
			marginLeft: 0
		});

		$('.letter-w').addClass('translated');

		setTimeout(function () {

			$('.nav-trigger').fadeIn(400);

		}, 300);

	}


	$(document).on('focusin', '.field, textarea', function () {
		if (this.title == this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function () {
		if (this.value == '') {
			this.value = this.title;
		}
	});

	$('.navigation > ul > li > a').on('click', function () {
		$(this).parent('li').find('ul').stop(true, true).slideToggle(300);
	});

	$('.slider-nav span').css({
		opacity: 0
	});

	$(document).on('mouseenter', '.slider a', function () {
		$('.slider-nav span').stop(true, true).animate({
			opacity: 1
		}, 150);
	}).on('mouseleave', '.slider a', function () {
		$('.slider-nav span').stop(true, true).animate({
			opacity: 0
		}, 150);
	});

	$('.to-top').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 700);
		return false;
	});

	$('.scroll-down').on('click', function () {
		var win_pos = $win.scrollTop();
		$('html, body').animate({
			scrollTop: win_pos + 400
		}, 700);

		return false;
	});

	$('.nav-trigger, .letter-q, .letter-d').on('click', function () {
		$('.outer-wrap').addClass('nav-expanded');
		$('.letter-d').removeClass('translated');
		$('.nav-trigger').fadeOut(150);
		$('.logo span').addClass('flip');
		$('.letter-q').css({
			left: "0px",
			marginLeft: "125px"
		});
		$('.letter-d').css({
			left: "0px",
			marginLeft: "150px"
		});
		$('.homepage .navigation > ul, .inner-slider .navigation > ul').animate({
			left: -2
		}, 400);
	});

	$(document).mouseup(function (e) {
		var container = $(".nav-trigger");
		if (container.has(e.target).length === 0) {
			$('.dd-trigger').removeClass('focused');
		}
	});

	var $win = $(window);

	$win.on('load', function () {

		if ($win.height() >= $(document).height()) {
			$('.scroll-down, .to-top').hide();
		}

		//  HOMEPAGE SLIDER 
if ($('.homepage').length) {

			$('.splash').fadeIn(2500);

			setTimeout(function () {

				init_sliders();

			}, 6000);

			setTimeout(function () {

				var timer = 290;

				$('.homepage .logo span').each(function () {

					timer += 100;

					var $this = $(this);

					var letter_width = $this.width();

					setTimeout(function () {

						$this.addClass('flip');

					}, timer);

				});

			}, 1850);

			setTimeout(function () {
				$('.splash').fadeOut(1000);

			}, 6000);

			setTimeout(function () {
				$('.homepage .navigation > ul').fadeIn(600);

			}, 6750);

			setTimeout(function () {

				$('.homepage .captions-holder').animate({
					opacity: 1
				}, 600);
				$(".homepage .captions-holder").trigger('updateSizes');

			}, 6900);

			setTimeout(function () {

				$('.homepage .slider').css({
					right: 0
				});

			}, 7200);
		} else {

			init_sliders();
			$(".captions-holder").trigger('updateSizes');
		}
		

		$('.popup-link').on('click', function (e) {

			var vid_title = $(this).attr('title');

			var vid_date = $(this).data('date');

			e.preventDefault();

			var height = $(this).data("height");
			var width = $(this).data("width");
			var url = $(this).attr("href");

			$.magnificPopup.open({
				items: {
					src: url
				},
				type: 'iframe',
				markup: '<div class="mfp-iframe-scaler">' +
					'<div class="mfp-close"></div>' +
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
					'<div class="mfp-bottom-bar">' +
					'<div class="mfp-title"></div>' +
					'</div>' +
					'</div>',
				titleSrc: function (item) {
					alert(item.el.attr('title'));
					return item.el.attr('title');
				},
				callbacks: {
					open: function () {
						$('.mfp-iframe-scaler iframe ').height($(window).height() - 143);
						$('.mfp-content').append('<div class="vid-caption"><h2>' + vid_title + '</h2><p>' + vid_date + '</p></div>')
					}
				}
			});
		});
	});

	$win.on('scroll', function () {
		init_arrows();
	});


	$win.on('resize', function () {
		resize_slider();

		$('.mfp-iframe-scaler iframe ').height($(window).height() - 143)

		if ($(window).width() < 768) {

			$('.next, .prev').hide();
		}

		$('.slider img').fullscreener();

	});

	if ($(window).width() < 768) {

		$('.next, .prev').hide();
	}

	if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

		$('.navigation').addClass('mobile');

		nav_resize();

		$('.scroll-down').css({
			marginLeft: "-118px"
		});

		$('.to-top').css({
			marginLeft: "-130px"
		});

		resize_slider();
	} else {

		$('.navigation').removeClass('mobile');
	}

	if (/iPad/i.test(navigator.userAgent)) {

		$('.scroll-down').css({
			marginLeft: "-118px"
		});
		$('.to-top').css({
			marginLeft: "-130px"
		});
		resize_slider()
	}

	function nav_resize() {
		var sliderHeight = $('.navigation .caroufredsel_wrapper').height(),
			listHeight = $('.navigation > ul').outerHeight();
		listTop = parseInt($('.navigation > ul').css('paddingTop'));

		$('.homepage .outer-wrap').css('minHeight', 115 + listHeight + listTop)
	}
});


function init_sliders() {

	var total_slides = $(".slider ul li").length;

	resize_slider();

	var current_pos = $('.slider ul').triggerHandler('currentPosition');
	var image_title;

	var slide_pos = parseInt(window.location.hash.replace('#', ''));

	$(".homepage .slider ul, .inner-slider .slider ul").not('.books-slider .slider ul').carouFredSel({

		onCreate: function () {
			$('.slider img').fullscreener();
			current_pos = $('.slider ul').triggerHandler('currentPosition');
			$('.prev').hide();
			image_title = $(".slider ul li:eq('" + current_pos + "')").data('info');
			$('.slider ul').trigger('slideTo', slide_pos - 1);
		},

		synchronise: [".inner-slider .captions-holder, .homepage .captions-holder", false, true, null],
		auto: false,
		circular: true,
		infinite: false,
		responsive: true,
		items: {
			visible: 1
		},
		swipe: {
			onTouch: true
		},
		scroll: {
			items: 1,
			fx: "scroll",
			easing: "swing",
			queue: true,
			duration: 700,
			onBefore: function () {

				$('.outer-wrap').removeClass('nav-expanded');

				$('.homepage .navigation > ul, .inner-slider .navigation > ul').animate({
					left: -220
				}, 400);

				$('.logo span').not('.letter-q, .letter-d').removeClass('flip');

				$('.letter-q').css({
					left: 0,
					marginLeft: 0
				});
				$('.letter-d').css({
					left: 25,
					marginLeft: 0
				});

				$('.letter-w').addClass('translated');

				setTimeout(function () {

					$('.nav-trigger').fadeIn(400);
				}, 300);

				if ($('.slider ul').triggerHandler('currentPosition') == 0) {

					$('.prev').hide();

					setTimeout(function () {

						$('.nav-trigger').trigger('click');

					}, 300);

					setTimeout(function () {

						$('.outer-wrap').removeClass('nav-expanded');

					}, 300);

				} else {

					$('.prev').show();

				}

			},

			onAfter: function () {

				image_title = $('.slider ul li').data('info');
				window.location.hash = image_title
			}

		},

		prev: {
			button: ".prev",
			key: "left",
		},
		next: {
			button: ".next",
			key: "right"
		}
	});

	$(".books-slider .slider ul").carouFredSel({

		onCreate: function () {
			$('.slider img').fullscreener();
			current_pos = $('.slider ul').triggerHandler('currentPosition');
			$('.prev').hide();
			image_title = $(".slider ul li:eq('" + current_pos + "')").data('info');
			$('.slider ul').trigger('slideTo', slide_pos - 1);
		},

		synchronise: [".inner-slider .captions-holder, .books-slider .captions-holder, .homepage .captions-holder", false, true, null],
		auto: false,
		circular: false,
		infinite: false,
		responsive: true,
		items: {
			visible: 1
		},
		swipe: {
			onTouch: true
		},
		scroll: {
			items: 1,
			fx: "crossfade",
			easing: "swing",
			queue: true,
			onBefore: function () {

				$('.outer-wrap').removeClass('nav-expanded');

				$('.homepage .navigation > ul, .inner-slider .navigation > ul').animate({
					left: -220
				}, 400);

				$('.logo span').not('.letter-q, .letter-d').removeClass('flip');

				$('.letter-w').css({
					left: 31,
					marginLeft: 0
				});

				$('.letter-w').addClass('translated');

				setTimeout(function () {

					$('.nav-trigger').fadeIn(400);

				}, 300);

				if ($('.slider ul').triggerHandler('currentPosition') == 0) {

					$('.prev').hide();

					setTimeout(function () {

						$('.nav-trigger').trigger('click');

					}, 300);

					setTimeout(function () {

						$('.outer-wrap').removeClass('nav-expanded');

					}, 300);

				} else {

					$('.prev').show();
				}
			},

			onAfter: function () {

				image_title = $('.slider ul li').data('info');
				window.location.hash = image_title
			},
			onEnd: function (data) {
				$('.next').attr('href', '/books')
					.on('click', function () {
						var $href = $('.next').attr('href');
						window.location = $href;
						return true;
					});

				$(document).on('keyup', function (e) {
					if (e.keyCode === 39) {
						$('.next').trigger('click');
					}
				});

				$('.books-slider').swipe({
					swipeLeft: function () {
						$('.next').trigger('click');
					}
				});

			}
		},
		prev: {
			button: ".prev",
			key: "left"
		},
		next: {
			button: ".next",
			key: "right"
		}
	});

	$(".homepage .captions-holder, .inner-slider .captions-holder").not('.books-slider .captions-holder').carouFredSel({

		auto: false,
		onCreate: function () {

			$('.captions-holder').trigger('slideTo', slide_pos - 1);
		},

		items: {
			visible: 1,
			width: "145px"
		},
		width: "145px",
		circular: true,
		infinite: false,
		responsive: true,
		scroll: {
			duration: 600,
			fx: "fade",
			items: 1
		}
	});
	$('.books-slider .captions-holder').carouFredSel({

		auto: false,
		onCreate: function () {

			$('.captions-holder').trigger('slideTo', slide_pos - 1);
		},

		items: {
			visible: 1,
			width: "145px"
		},
		width: "145px",
		circular: false,
		infinite: false,
		responsive: true,
		scroll: {
			duration: 600,
			fx: "fade",
			items: 1
		}
	});
	$('.image-loader').fadeOut(100);
	setTimeout(function () {
		$('.inner-slider .slider ul, .books-slider .slider ul, .homepage .captions-holder, .inner-slider .captions-holder').animate({
			opacity: 1
		}, 300);
	}, 100);

	init_arrows();
}

function init_arrows() {
	var $win = $(window);

	if ($win.scrollTop() + $(window).height() >= $(document).height() - 50) {
		$('.scroll-down').hide();
		$('.to-top').fadeIn(300);
	} else {
		$('.to-top').hide();
		$('.scroll-down').fadeIn(300);
	}

	if ($(window).width() < 768) {
		$('.next, .prev').hide();
	}
}

function resize_slider() {

	var $win = $(window);
	var wrap_height = $win.height();
	var $elements = $('.slider, .slider .caroufredsel_wrapper, .slider ul');

	$elements.height(wrap_height);
	$('.slider ul li').height(wrap_height - 66);
}
