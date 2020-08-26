function  changeCssInd() {
    var w =  document.body.clientWidth;
        if (w >=  '1000' )
        {
			
			$(function () {
				$(window).scroll(function () {
					if ($(this).scrollTop() > 50)
					{
						$('#header').addClass('header--white');
						
					}
					else
					{
						$('#header').removeClass('header--white');
						
					}
				});
			
			});	
			
		}
        else 
        {
			$('#header').addClass('header--white').removeClass('ind_header');
			
	 };
};
window.onload  = changeCssInd;


$('.search-form__button').on('click', function(){
    // $('.content').removeClass('dn')
    $('.advantages').addClass('show-result')
    $('.search-result').addClass('show-result')
    $('.extracts').addClass('show-result').removeClass('dn')
    $('.extracts .container').removeClass('dn')
    $('.extract-form').removeClass('dn')
    $('.address').addClass('dn')
    // $('.extracts-item').addClass('show-result')
});

$('.nav-toggle').on('click', function(){
    $(this).toggleClass('opened')
    $('.menu').slideToggle()
    $('.mobile-icons').fadeToggle ()
});

$('.menu__list-link').on('click', function(e) {
    $('.extracts').removeClass('show-result')
    $('.extracts .container').removeClass('dn')
    $('.extract-form').addClass('dn')
    
    var w =  document.body.clientWidth; 
    if (w <=  '650' )
    {
        $('.menu').slideToggle()
        $('.nav-toggle').toggleClass('opened')
        $('.mobile-icons').fadeToggle ()
    }
    
});

$('.menu__list-link--extract').on('click', function(e) { 
    e.preventDefault(); 
    $('.menu__list-link').removeClass('active')
    $(this).addClass('active')
    $('.content').addClass('dn')
    $('.price').removeClass('dn')
    $('.extracts').removeClass('dn').addClass('max-width')
    $('.how-work--last').addClass('dn')
    // $('#content').load('index.html #content');
});



$('.menu__list-link--questions').on('click', function(e) { 
    e.preventDefault(); 
    $('.menu__list-link').removeClass('active')
    $(this).addClass('active')
    $('.content').addClass('dn')
    $('.questions').removeClass('dn')
    $('.how-work').removeClass('dn')
    $('.location').removeClass('dn')    
    $('.extracts').removeClass('max-width')
    $('.how-work--last').addClass('dn')
});


$('.basket-tab').on('click', function(e) { 
    e.preventDefault(); 
    $('.menu__list-link').removeClass('active')
    $('.menu__list-link--basket').addClass('active')
    $('.content').addClass('dn')
    $('.basket').removeClass('dn')
    $('.how-work').removeClass('dn')
    $('.how-work--last').addClass('dn')
});

$('.menu__list-link--basket').on('click', function(e) { 
    e.preventDefault(); 
    $('.menu__list-link').removeClass('active')
    $(this).addClass('active')
    $('.content').addClass('dn')
    $('.basket').removeClass('dn')
    $('.how-work').removeClass('dn')
    $('.how-work--last').addClass('dn')
});

$('.menu__list-link--orders').on('click', function(e) { 
    e.preventDefault(); 
    $('.menu__list-link').removeClass('active')
    $(this).addClass('active')
    $('.content').addClass('dn')
    $('.order-login').removeClass('dn')
    $('.how-work').removeClass('dn')
    $('.how-work--last').addClass('dn')
});


$('.tab').on('click', function(e){
    e.preventDefault(); 
  
    $($(this).siblings()).removeClass('active');
    $($(this).parent().siblings().find('.tab-content')).removeClass('active');
  
    $(this).addClass('active')
    $($(this).attr('href')).addClass('active');
  
  });


  $('.questions__item-title').on('click', function(){
    $(this).parent().toggleClass('active')
    $(this).next().slideToggle()
  });

  $(".fancybox").fancybox({
    
    buttons: [
        "zoom",
        //"share",
        "slideShow",
        //"fullScreen",
        //"download",
        "thumbs",
        "close"
      ],
      
    btnTpl : {
        close : '<button data-fancybox-close class="fancybox-close">закрыть<img src="images/icons/fancybox-close.svg" alt=""></button>'
       }
});

$('.search-form__input').focus(function(){
    $('.search-form__input-list').show()
});
$(document).on('click', function(e) {
    if (!$(e.target).closest(".search-form__input").length) {
      $('.search-form__input-list').hide();
    }
    e.stopPropagation();
  });
$('.search-form__input-list li').click(function(){
    var text = $(this).text();
    $('.search-form__input').val(text);
});

$('.search-form__input-list li').click(function () {
    $('.address').removeClass('dn')
    $('.advantages').addClass('dn')
    $('.extracts .container').addClass('dn').removeClass('show-result')
    $('.extracts').removeClass('show-result')
    $('.search-result').removeClass('show-result')
});

$('.extract-form__button-add').click(function () {
    $(this).addClass('added')
});







