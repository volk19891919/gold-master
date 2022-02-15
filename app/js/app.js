// import $ from 'jquery'; window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)
//import slick from 'slick-carousel'
//import owl from 'owl.carousel'
//import magnificpopup from 'magnific-popup'
// require('/vendor/stepper.min.js') // Require Other Script(s) from app/js folder Example
import { stepper } from "stepper.js/src/stepper.js"
//import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox.js"
import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper'
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

//import { gsap, Power2 } from 'gsap'
//import MicroModal from 'micromodal'
//import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox.js"

document.addEventListener('DOMContentLoaded', () => {

	$('.burger').click(function () {
		$(this).toggleClass('active');
		$('.main-menu').toggleClass('active');
	});



	$(".js-collapse__btn").click(function () {
		$(this).toggleClass('active').siblings('.js-collapse .js-collapse__content').slideToggle();
		return false;
	});



	$('ul.js-tabs__nav').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.js-tabs').find('.js-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});

	$('body').on('click', '.js-btn-password', function(){
		if ($(this).siblings('.input-password').attr('type') == 'password'){
			$(this).addClass('off')
			.siblings('.input-password').attr('type', 'text');
		} else {
			$(this).removeClass('off')
			.siblings('.input-password').attr('type', 'password');
		}
		return false;
	});



	$(".btn-filter-clean").click(function () {
		$(".filter input").prop('checked', false);
		return false;
	});

	$(".js-filter-btn").click(function () {
		$(".aside-filter").addClass('active');
		return false;
	});

	$(".aside-filter__close").click(function () {
		$(".aside-filter").removeClass('active');
		return false;
	});

	$(document).on('mouseup', function (e) {
		let filter = $('.aside-filter');
		if (!filter.is(e.target) && filter.has(e.target).length === 0) {
			filter.removeClass('active');
		}
	});



	//Select
	$(".js-select__btn").click(function () {
		$(this).toggleClass('active').siblings('.js-select__list').toggleClass('active');
		return false;
	});

	$(document).on('mouseup', function (e) {
		let select = $('.js-select');
		if (!select.is(e.target) && select.has(e.target).length === 0) {
			$('.js-select__list').removeClass('active');
			$('.js-select__btn').removeClass('active');
		}
	});

	$('ul.js-select__list').on('click', 'li:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active');
		$('.js-select__list').removeClass('active');
		$('.js-select__btn').removeClass('active');
	});



	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.scroll-up').fadeIn();
		}
		else {
			$('.scroll-up').fadeOut();
		}
	});
	$('.scroll-up').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});



	$('.btn-popup').click(function () {
		$('.popup')
			.removeClass('active')
			.filter('[data-id="' + $(this).data('link') + '"]')
			.addClass('active');
		$('body').addClass('body-hidden')
	});
	
	$('.btn-popup-close').click(function () {
		$('.popup').removeClass('active');
		$('body').removeClass('body-hidden')
	});
	
	$('.popup__overlay').click(function () {
		$('.popup').removeClass('active');
		$('body').removeClass('body-hidden')
	});



	const homeSlider = new Swiper(".home-slider", {
		pagination: {
			el: ".home-slider__pagination",
			type: "fraction",
		},
		navigation: {
			prevEl: ".home-slider__prev",
			nextEl: ".home-slider__next",
		},
	});

	const newsSlider = new Swiper(".news-slider", {
		slidesPerView: 1,
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				autoHeight: false,
				spaceBetween: 20
			},
			993: {
				slidesPerView: 3,
				enabled: false,
				spaceBetween: 0,
				slidesPerView: "auto",
			},
		}
	});

	const ceremonyCar = new Swiper(".ceremony-car", {
		slidesPerView: "auto",
		loop: true,
		navigation: {
			prevEl: ".ceremony-car__prev",
			nextEl: ".ceremony-car__next",
		},
		breakpoints: {
			320: {
				slidesPerView: "auto",
				spaceBetween: 13
			},
			993: {
				slidesPerView: "auto",
				spaceBetween: 20,
			},
		}
	});

	const partnersSlider7 = new Swiper(".partners-slider_col-7", {
		slidesPerView: "auto",
		loop: true,
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
		breakpoints: {
			320: {
				slidesPerView: "auto",
				spaceBetween: 50
			},
			993: {
				slidesPerView: 7,
				enabled: false,
				spaceBetween: 50,
				loop: false,
			},
		}
	});

	const partnersSlider5 = new Swiper(".partners-slider_col-5", {
		slidesPerView: "auto",
		loop: true,
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
		breakpoints: {
			320: {
				slidesPerView: "auto",
				spaceBetween: 30
			},
			768: {
				slidesPerView: "auto",
				spaceBetween: 73
			},
			993: {
				slidesPerView: 5,
				enabled: false,
				spaceBetween: 73,
				loop: false,
			},
		}
	});

	const winnersSlider = new Swiper(".winners-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		observeParents: true,
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
	});

})
