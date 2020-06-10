$(document).ready(function(){

  /*checking browser for WEBP*/
  hasWebP().then(function () {
    $('.webp-img').each(function () {
      var webp = $(this).data('webp');
      $(this).css('background-image', 'url('+ webp +')');
    });
  }, function () {
    $('.webp-img').each(function () {
      var img = $(this).data('img');
      $(this).css('background-image', 'url('+ img +')');
    });
  });

  var bLazy = new Blazy({
    src: 'data-blazy'
  });

  $('#menu-btn').click(function (e) {
    $(this).parent().toggleClass('show');
    $('.header__nav').toggleClass('show');
    $('body').toggleClass('boh');
    $('.nav__item').removeClass('open');
  });

  // $('.nav__subnav-btn').click(function(e){
  //   $(this).closest('.nav__item').toggleClass('open');
  // });


  /*mobile submenu close when click another sub item*/
  $('.nav__subnav-btn').click(function(e) {
    if ($(this).closest('.nav__item').hasClass('open')){
      $('.nav__item').removeClass('open');
    } else {
      $('.nav__item').removeClass('open');
      $(this).closest('.nav__item').addClass('open');
    }
  });



  $(document).on('click', function (e) {
    if( $('.header__nav.show').length != 0){
      if($(e.target).closest('.header').length == 0) {
        $('#menu-btn').click();
        $('.nav__item').removeClass('open');
      }
    }
  });


  // mobile bg

  if($(window).width() < 550){
    var mobBg = $('.half-block__bg--img').attr('data-mobile-bg');
    $('.half-block__bg--img').css('background-image', 'url(' + mobBg + ')');
  }

  // mobile bg end

  /*sliders*/

  if($(window).width() < 768){
    $('#activities-slider').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  var $licenSlider = $('#licenses-slider');


  $licenSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $licenSlider.magnificPopup({
    delegate: 'a:not(.slick-cloned)',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300
    },
    removalDelay: 300,
    disableOn: 0,
    midClick: true,

  });

  $('.slick-slider').on('afterChange', function(event, slick, direction){
    bLazy.revalidate();
  });

  /*sliders end*/



  $('.questions__item').click(function (e) {
    $(this).toggleClass('open');
  });



  /*validation start*/

  $('form .submit-btn').click(function (e) {
    e.preventDefault();
    if ($(this).closest('form').find('input[data-valid="phone"]').length != 0) {
      var inputTel = $(this).closest('form').find('input[data-valid="phone"]');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-input').addClass('correct');
        $(inputTel).closest('.site-input').removeClass('error-field');
      } else {
        $(inputTel).closest('.site-input').removeClass('correct');
        $(inputTel).closest('.site-input').addClass('error-field');
      }
    }

    // if($(this).closest('form').find('input[type="email"]')) {
    //   var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
    //
    //   var input = $(this).closest('form').find('input[type="email"]');
    //   var email = $(this).closest('form').find('input[type="email"]').length > 0
    //     ? $(this).closest('form').find('input[type="email"]')
    //     : false;
    //
    //
    //   if (email.val() == "" && email !== false) {
    //     email.closest('.site-input').addClass('error-field');
    //
    //   } else {
    //     if (reg.test(email.val()) == false) {
    //       email.closest('.site-input').addClass('error-field');
    //
    //     } else {
    //       email.closest('.site-input').removeClass('error-field');
    //       $(this.closest('form')).addClass('active');
    //     }
    //   }
    // }

    $(this).closest('form').find('input[data-valid="name"]').each(function () {
      if ($(this).val() === '') {
        $(this).closest('.site-input').addClass('error-field');
        $(this).closest('.site-input').removeClass('correct');
      } else {
        $(this).closest('.site-input').addClass('correct');
        $(this).closest('.site-input').removeClass('error-field');
      }
    });

    if($(this).closest('form').find('.error-field').length == 0 && $(this).closest('form').find('.correct').length != 0){
      $(this).closest('form').addClass('submitted');
      /*ajax to submit the form*/
    }

  });

  var phoneMask = $('input[data-valid="phone"]');
  $(phoneMask).inputmask('+7 (999) 999 99 99');

  /*validation end*/


  AOS.init({
    duration: 600,
    delay: 200,
    disable: "mobile",
  });

});


/*script fro webp img and background*/
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();

