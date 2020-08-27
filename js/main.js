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


//$(".search-form__input").suggestions({
//     token: "4c6e33332e10e1bccff49c0cf3f5e7a2326c2755",
//     type: "ADDRESS",
//        /* Вызывается, когда пользователь выбирает одну из подсказок */
//     onSelect: function(suggestion) {
//            console.log(suggestion);
//     }
//});

var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
var token = "4c6e33332e10e1bccff49c0cf3f5e7a2326c2755";
var query = "питер";

var options = {
    method: "POST",
//    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify({query: query})
}

//fetch(url, options)
//.then(response => response.json())
//.then(result => console.log(result))
//.catch(error => console.log("error", error));

fetch('https://cors-anywhere.herokuapp.com/https://ros.devpreview.info/api/v1/address/get-info?object=23:33:0907011:9')
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log("error", error));




