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



$('.nav-toggle').on('click', function(){
    $(this).toggleClass('opened')
    $('.menu').slideToggle()
    $('.mobile-icons').fadeToggle ()
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


$(document).on('click', function(e) {
    if (!$(e.target).closest(".search-form__input").length) {
      $('.search-form__input-list').hide();
    }
    e.stopPropagation();
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




