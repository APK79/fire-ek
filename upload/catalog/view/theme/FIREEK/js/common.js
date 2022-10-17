function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

//Hide Cart, Compare and Wishlist Count on Load
function hideCount(c){
	const count = document.querySelector(c).firstChild.innerHTML;
	const hideBlock = document.querySelector(c);
	(+count != 0) ? hideBlock.hidden = false : hideBlock.hidden = true;
}

// ES6 Click Handler elem - Click Tabs, Container, Content
function clickTabs(jsTab, tabBox, tabContent){
 const tabContainer = document.querySelector(tabBox);
 const contContent = tabContainer.querySelectorAll(tabContent);
 const btnTabs = tabContainer.querySelectorAll(jsTab);
 btnTabs.forEach((btnTab) => btnTab.addEventListener('click', clickHandlerTabs));

    function clickHandlerTabs(e) {
     e.preventDefault();
    btnTabs.forEach(btnTab => btnTab.classList.toggle('active'));
    contContent.forEach(cont => cont.classList.toggle('active'));
      }
}
// hide and Show - Target button and Target box (hide, show).
function hideShowMenu(targetBtn, targetHideBox){
   document.querySelector(targetBtn).addEventListener('click',    handleClick);
   const body = document.querySelector('body');
   const headMenu = document.querySelector(targetHideBox);

  function handleClick(e) {
    e.preventDefault();
    if (headMenu.classList.contains("hidden")) {
      headMenu.classList.remove("hidden");
      setTimeout(() => headMenu.classList.add('active'), 5);
			body.addEventListener('click',   bodyHandleClick);
    }
    else {
      headMenu.classList.remove('active');
      setTimeout(() => headMenu.classList.add("hidden"), 180);
			body.removeEventListener('click',   bodyHandleClick);
    }
  }
  function bodyHandleClick(e) {
      if (!headMenu.classList.contains("hidden") && !e.target.closest(targetBtn) && !e.target.closest(targetHideBox)) {
      headMenu.classList.remove('active');
      setTimeout(() => headMenu.classList.add("hidden"), 180);
			body.removeEventListener('click',   bodyHandleClick);
    }
  }
}
//END hide and Show

//popup window
function popupWindow(targetClass, slideClass, closeClass){

  let popupOpen = false;
	const targetBtn = document.querySelector(targetClass);
  	targetBtn.addEventListener('mouseup', togglePopup);
	const slideItem = document.querySelector(slideClass);
	const closeItems = document.querySelectorAll(closeClass);
		closeItems.forEach(item => item.addEventListener('mouseup', closePopup));
	const BODY = document.querySelector('body');

  function togglePopup(e) {
     e.preventDefault();
     if(popupOpen) {
    	 closePopup();
     }
     else {
     openPopup();
    }
  }

  function scrollCheck() {
     const newDiv = document.createElement('div');

     newDiv.style.overflowY = 'scroll';
     newDiv.style.width = '30px';
     newDiv.style.height = '30px';
     newDiv.style.visibility = 'hidden';

     document.body.appendChild(newDiv);
    	 let scrollWidth = newDiv.offsetWidth - newDiv.clientWidth;
     document.body.removeChild(newDiv);
    	 return scrollWidth;
    }

  function openPopup() {
     popupOpen = true;
     BODY.classList.add('active');
     BODY.style.paddingRight = scrollCheck()+'px';
     slideItem.classList.add('active');
  }
  function closePopup() {
     popupOpen = false;
     BODY.classList.remove('active');
     BODY.style.paddingRight = '0px';
     slideItem.classList.remove('active');
  }
}
//end popupWindow

//change quantity (The elements responsible for increasing and decreasing should have a name = 'plus' and 'minus')
function changeQuantity (targetBox){
	const COUNT = document.querySelector(targetBox);
	const PLUS_BTN = COUNT.nextElementSibling;
	const MINUS_BTN = COUNT.previousElementSibling;
	let timeout, interval;
	let counterInc = false;
	let counterDec = false;


	if(PLUS_BTN.getAttribute('name') === 'plus'){
		PLUS_BTN.addEventListener('click', () => (+COUNT.value < 999) ? +COUNT.value++ : COUNT.value = 999);
		PLUS_BTN.addEventListener('mousedown', mouseDownHandler);
	}
	if (MINUS_BTN.getAttribute('name') === 'minus' && +COUNT.value >= 1) {
		MINUS_BTN.addEventListener('click', () => (+COUNT.value > 1) ? +COUNT.value-- : COUNT.value = 1);
	  MINUS_BTN.addEventListener('mousedown', mouseDownHandler);
	}

	function mouseDownHandler(e) {
		if (e.target == PLUS_BTN){
			counterInc = true;
			timeout = setTimeout ( () => interval = setInterval (calculation, 100), 500);
			PLUS_BTN.removeEventListener('mousedown', mouseDownHandler);
			PLUS_BTN.addEventListener('mouseup', mouseUpHandler);
			PLUS_BTN.addEventListener('mouseleave', mouseUpHandler);
		}else if (e.target == MINUS_BTN){
			counterDec = true;
			timeout = setTimeout ( () => interval = setInterval (calculation, 100 ), 500);
			MINUS_BTN.removeEventListener('mousedown', mouseDownHandler);
			MINUS_BTN.addEventListener('mouseup', mouseUpHandler);
			MINUS_BTN.addEventListener('mouseleave', mouseUpHandler);
		}else{
			counterInc = false;
			counterDec = false;
		}
	}
		function mouseUpHandler() {
			if (counterInc){
				PLUS_BTN.removeEventListener('mouseleave', mouseUpHandler);
				PLUS_BTN.removeEventListener('mouseup', mouseUpHandler);
				PLUS_BTN.addEventListener('mousedown', mouseDownHandler);
				counterInc = false;
			}else if (counterDec){
				MINUS_BTN.removeEventListener('mouseleave', mouseUpHandler);
				MINUS_BTN.removeEventListener('mouseup', mouseUpHandler);
				MINUS_BTN.addEventListener('mousedown', mouseDownHandler);
				counterDec = false;
			}else{
				counterInc = false;
				counterDec = false;
			}
		}
		function calculation() {
			if (counterInc){
				+COUNT.value++
			}else if (counterDec && +COUNT.value > 1)
				+COUNT.value--
			else {
				clearInterval(interval);
				clearTimeout(timeout);
		}
	}
}
//Custom Select
function customSelect() {

	const selects = document.querySelectorAll('.select');

	for(let i = 0; i < selects.length; i++){
		const select = selects[i];
		const options = select.querySelectorAll('option');
		const cSelect = document.createElement('div');
		const cSelectList = document.createElement('div');
		const cSelectCurrent = document.createElement('div');

		cSelect.className = 'custom-select';
		cSelectList.className = 'custom-select__list custom-scrollbar';
		cSelectCurrent.className = 'custom-select__current';

		cSelect.append(cSelectCurrent, cSelectList);

		select.after(cSelect);

		const createCustomDom = (x, y) => {
			let selectItems = '';
			for(var i = 0; i < options.length; i++){
				selectItems += '<div class="custom-select__item" data-value="'+options[i].value+'">'+options[i].text+'</div>';
			}
			cSelectList.innerHTML = selectItems;
			x(),y();
		}

		const toggleClass = () => {cSelect.classList.toggle('custom-select--show')}

		const currentTextValue = () => cSelectCurrent.textContent = cSelectList.children[0].textContent;

		function getCurrentSelectedItem(){
			const currentCustomText = cSelect.firstElementChild;
			options.forEach((item) => {
				let selectedItem = (item.getAttribute("selected") ? item.innerText : null);
				(currentCustomText.innerText != selectedItem && selectedItem != null) ? currentCustomText.innerText = item.innerText : null;
			});
		}

		const currentValue = () => {
			const items = cSelectList.children;
			for(var el = 0; el < items.length; el++){
				let selectValue = items[el].getAttribute('data-value');
				let selectText = items[el].textContent;
				items[el].addEventListener('click', () => {
					cSelect.classList.remove('custom-select--show');
					cSelectCurrent.textContent = selectText;
					select.value = selectValue;
					document.location.href = select.value;
					getCurrentSelectedItem()
				})
			}
		}

		const desctopFn = () => {
			cSelectCurrent.addEventListener('click', toggleClass);
		}

		const mobileFn = () => {
			for(let j = 0; j < selects.length; j++){
				let mobileSelect = selects[j];
				console.log(mobileSelect);
				mobileSelect.addEventListener('change', ()=> {
					mobileSelect.nextElementSibling.querySelector('.custom-select__current').textContent = mobileSelect.value;
				})
			}
		}

		createCustomDom(currentTextValue, currentValue);

		window.addEventListener("DOMContentLoaded", getCurrentSelectedItem());

		document.addEventListener('mouseup', (e) =>{
	    if (!cSelect.contains(e.target))	cSelect.classList.remove('custom-select--show')
		})

		detectmob(mobileFn, desctopFn)

		function detectmob(x,y) {
			if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
			){
				x();
				console.log('mobile')
			}
			else {
				y();
				console.log('desktop')
			 }
		 }
	}
}

//dropdown category Menu
function dropdownMenu(m){
	const MENU = document.querySelector(m);
	const items = MENU.firstElementChild.querySelectorAll('.js-dropdown');
	items.forEach( (item) => item.addEventListener('click', handleClick) );
	const cItems = MENU.querySelectorAll('.js-child-dropdown');
	cItems.forEach( (item) => item.addEventListener('click', handleClick) );

	function handleClick(e){
		e.preventDefault();
		if (this.classList.contains('js-dropdown')){
			//items.forEach( (item) => (item !== this) ? item.parentElement.nextElementSibling.classList.add('hidden') : item.parentElement.nextElementSibling.classList.toggle('hidden') );
			items.forEach( (item) => {
				if (item !== this) {
					item.parentElement.nextElementSibling.classList.add('hidden');
					(window.innerWidth < 768 && this.classList.contains('angle_rotated')) ? this.classList.remove('angle_rotated') : this.classList.add('angle_rotated');
			}else
					item.parentElement.nextElementSibling.classList.toggle('hidden');
					(window.innerWidth < 768 && !this.classList.contains('angle_rotated')) ? this.classList.toggle('angle_rotated') : this.classList.remove('angle_rotated');
			});
		}else{
			//cItems.forEach( (item) => (item !== this) ? item.parentElement.nextElementSibling.classList.add('hidden') : item.parentElement.nextElementSibling.classList.toggle('hidden') );
			cItems.forEach( (item) => {
				if (item !== this) {
					item.parentElement.nextElementSibling.classList.add('hidden');
					(window.innerWidth < 768 && this.classList.contains('angle_rotated')) ? this.classList.remove('angle_rotated') : this.classList.add('angle_rotated');
			}else
					item.parentElement.nextElementSibling.classList.toggle('hidden');
					(window.innerWidth < 768 && !this.classList.contains('angle_rotated')) ? this.classList.toggle('angle_rotated') : this.classList.remove('angle_rotated');
			});
		}
	}
}

$(document).ready(function() {

	// start function

	// if count zero, wishlits quantity hide
	hideCount('.wishlist');
	// if count zero, cart quantity and cost hide
	hideCount('.header__cart');
	//Header account change autorisation <=> registation
	clickTabs('.js-tab', '.js-tabs-box', '.js-tab-content');
	//Header account show/hide
	hideShowMenu ('.links-groupe__account-item', '.js-tabs-box');
	//Mobile Header account popup
	popupWindow(".js-toggle-mob-acc", ".head_account__mobile", ".js-close-mob-acc");
	//Header search input open
  hideShowMenu ('.btn-open-search', '#search');
	//Header menu-box input open
	popupWindow ('.js-btn-catalog-toggle', '.catalog__box', '.js-close-mob-acc');
	//Start slick slider
	previewImg();
	previewSlider();
  // custom select Start
	customSelect();
	//dropdown category Menu Start
	dropdownMenu('.catalog__box');
	//Mobile Header menu catalog popup
	popupWindow(".js-toggle-mobMenu", ".js-mobMenu-box", ".js-close-mob-acc");

	// Sticky navigation menu
	var navPos, winPos, navHeight;
	function refreshVar(){
			navPos = $('#menu').offset().top;
			navHeight = $('#menu').outerHeight(true);
	}
	refreshVar();
		$(window).resize(refreshVar);
		$('<div class="clone-menu"></div>').insertBefore('#menu').css('height', navHeight).hide();
		$(window).scroll(function(){
			winPos = $(window).scrollTop();
			win_w = $(window).width();
			if (winPos >= navPos && win_w > 768){
				$('#menu').addClass('fixed shadow');
				$('.clone-menu').show();
				//$('#header-links-groupe').addClass('fixed');
			}
			else {
				$('#menu').removeClass('fixed shadow');
				$('.clone-menu').hide();
				//$('#header-links-groupe').removeClass('fixed');
			}
	});

	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

// slick slider
	function previewImg() {
     var e = $(".thumbnail__slider-for");
     e.length && e.slick({
         dots: false,
         arrows: !1,
				 lazyLoad: "ondemand",
         slidesToShow: 1,
         slidesToScroll: 1,
         asNavFor: ".thumbnail__slider-nav",
         responsive: [{
             breakpoint: 767,
              settings: {
              arrows: !1,
					 		prevArrow: '<span class="slick-prev"><svg class="icon-angle-left"><use xlink:href="#angle-left"></use></svg></span>',
	         		nextArrow: '<span class="slick-next"><svg class="icon-angle-right"><use xlink:href="#angle-left"></use></svg></span>'
              }
             }]
     })
   }
  function previewSlider() {
     var e = $(".thumbnail__slider-nav");
     e.length && e.slick({
         lazyLoad: "ondemand",
         dots: false,
         arrows: !1,
         slidesToShow: 3,
         slidesToScroll: 1,
         vertical: false,
         centerMode: true,
         focusOnSelect: true,
         centerPadding: "0px",
         asNavFor: ".thumbnail__slider-for",
         prevArrow: '<span class="slick-prev"><svg class="icon-angle-left"><use xlink:href="#angle-left"></use></svg></span>',
         nextArrow: '<span class="slick-next"><svg class="icon-angle-right"><use xlink:href="#angle-left"></use></svg></span>',
         swipe: true,
         touchThreshold: 4
     })
 }



	// Currency
	$('#form-currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('name'));

		$('#form-currency').submit();
	});

	// Language
	$('#form-language .language-select').on('click', function(e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).attr('name'));

		$('#form-language').submit();
	});

	/* Search */
	$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header #search input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('#search input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$('header #search input[name=\'search\']').parent().find('button').trigger('click');
		}
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});

	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
		}

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// tooltips on hover
	$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});
});


// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('.alert-dismissible, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						$('#cart > button').html('<span><svg class="icon-cart-full"><use xlink:href="#cart-btn-full"></use></svg></span><span id="cart-total">' + json['total'] + '</span><span class="cart-summ">' + json['total_s'] + '</span>');
					}, 100);

					$('html, body').animate({ scrollTop: 0 }, 'slow');

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span><svg class="icon-cart-full"><use xlink:href="#cart-btn-full"></use></svg></span><span id="cart-total">' + json['total'] + '</span><span class="cart-summ">' + json['total_s'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				if (json['total'] == 0){
					setTimeout(function () {
						$('#cart > button').html('<span><svg class="icon-cart"><use xlink:href="#cart-btn"></use></svg></span><div class="header__cart"><span id="cart-total">' + json['total'] + '</span><span class="cart-summ">' + json['total_s'] + '</span></div>');
						hideCount('.header__cart');
					}, 100);
				}
				else{
					setTimeout(function () {
						$('#cart > button').html('<span><svg class="icon-cart-full"><use xlink:href="#cart-btn-full"></use></svg></span><span id="cart-total">' + json['total'] + '</span><span class="cart-summ">' + json['total_s'] + '</span>')
					}, 100);
				}
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}
/*slide cart*/
$(document).ready(function() {

 cartOpen = false;
 $('body').on('mouseup', '.js-toggle-cart', toggleCart);

function scrollCheck() {
 var div = document.createElement('div');

	 div.style.overflowY = 'scroll';
	 div.style.width = '30px';
	 div.style.height = '30px';
	 div.style.visibility = 'hidden';

 document.body.appendChild(div);
	 var scrollWidth = div.offsetWidth - div.clientWidth;
 document.body.removeChild(div);
	 return scrollWidth;
}
function toggleCart(e) {
 e.preventDefault();
 if(cartOpen) {
	 closeCart();
	 return;
 }
 openCart();
}

function openCart() {
 cartOpen = true;
 $('body').addClass('open').css({"padding-right":scrollCheck()});
 $('.slidecart').addClass('open');
 if($('#menu').hasClass('fixed')){
	 $('#menu').css({"padding-right":scrollCheck()});
	 $('#cart').css({"padding-right":scrollCheck()});
 };
}

function closeCart() {
 cartOpen = false;
 $('body').removeClass('open').css({"padding-right":0});
 $('.slidecart').removeClass('open');
 if($('#menu').hasClass('fixed')){
	 $('#menu').css({"padding-right":0});
	 $('#cart').css({"padding-right":0});
 };
}
$("body").on('mouseup', ".js-close-cart", closeCart);
});


var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span><i class="fa fa-shopping-basket"></i></span><span id="cart-total">' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert-dismissible').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				$('#wishlist-total span').html(json['total']);
				$('#wishlist-total').attr('title', json['total']);

				$('.wishlist span').html(json['total']);
				$('.wishlist').attr('title', json['total']);
				hideCount('.wishlist');

				$('html, body').animate({ scrollTop: 0 }, 'slow');

				$('.wishCount').html(json['total']);
				$('.wish-link').attr('hidden', false);
				$('.wish_dropdown').load('index.php?route=extension/module/wish/info ul li'); 
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert-dismissible').remove();

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					var compareCount = $('.compare-count');
					compareCount.html(json['total']);
					if(compareCount.length){
						hideCount('.compare-count');
					}

					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div>';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();

			$.extend(this, option);

			$(this).attr('autocomplete', 'off');

			// Focus
			$(this).on('focus', function() {
				this.request();
			});

			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);
			});

			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				value = $(event.target).parent().attr('data-value');

				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}

			// Show
			this.show = function() {
				var pos = $(this).position();

				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});

				$(this).siblings('ul.dropdown-menu').show();
			}

			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}

			// Response
			this.response = function(json) {
				html = '';

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}

					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}

					// Get all the ones with a categories
					var category = new Array();

					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}

							category[json[i]['category']]['item'].push(json[i]);
						}
					}

					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$(this).siblings('ul.dropdown-menu').html(html);
			}

			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

		});
	}
})(window.jQuery);
