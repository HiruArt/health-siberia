$(document).ready(function(){

  // checking browser for WEBP
  // hasWebP().then(function () {
  //   $('.webp-img').each(function () {
  //     var webp = $(this).data('webp');
  //     $(this).attr('data-blazy', webp);
  //   });
  // }, function () {
  //   $('.webp-img').each(function () {
  //     var img = $(this).data('img');
  //     $(this).attr('data-blazy',  img );
  //   });
  // });

	// var bLazy = new Blazy({
	// 	src: 'data-blazy'
	// });


  $('#menu-btn').click(function (e) {
    $(this).parent().toggleClass('show');
    $('.header__nav').toggleClass('show');
    $('body').toggleClass('boh');
    $('.nav__item').removeClass('open');
  });

  $('.nav__subnav-btn').click(function(e){
    $(this).closest('.nav__item').toggleClass('open');
  });


  // mobile submenu close when click another sub item
  // $('.nav__subnav-btn').click(function(e) {
  //   if ($(this).closest('.nav__item').hasClass('open')){
  //     $('.nav__item').removeClass('open');
  //   } else {
  //     $('.nav__item').removeClass('open');
  //     $(this).closest('.nav__item').addClass('open');
  //   }
  // });



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

  /*sliders end*/

});


//script fro webp img and background
// var hasWebP = (function () {
//   // some small (2x1 px) test images for each feature
//   var images = {
//     basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
//     lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
//   };
//
//   return function (feature) {
//     var deferred = $.Deferred();
//
//     $("<img>").on("load", function () {
//       // the images should have these dimensions
//       if (this.width === 2 && this.height === 1) {
//         deferred.resolve();
//       } else {
//         deferred.reject();
//       }
//     }).on("error", function () {
//       deferred.reject();
//     }).attr("src", images[feature || "basic"]);
//
//     return deferred.promise();
//   }
// })();

