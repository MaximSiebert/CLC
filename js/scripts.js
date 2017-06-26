$(document).ready(function(){

  //Easing
  var easeOutQuad = function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
  }
  //Navigation
  $('a[href^="#"]').on('click', function(event) {
    var target = $( $(this).attr('href') );
    if( target.length ) {
        event.preventDefault();
        window.location.hash = $(this).attr("href");
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000, easeOutQuad);
    }
  });

  //Contact
  $('a[href^="#contact"]').on('click', function(event) {
    $("html, body").animate({ scrollTop: $(document).height() }, 1000, easeOutQuad);
  });

  //Program Accordions
  var expand = $('.expand'),
      accordion = $('.accordion');

  expand.click(function(){
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).parent('.program').find('.accordion').slideUp();
    } else {
      $(this).addClass('open');
      $(this).parent('.program').find('.accordion').slideDown();
    }
  });

  $.ajax({
      method: "GET",
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=328759248.2e06978.70cb8504405e43e6b6f6eb8a73cf3283'
    }).then(function(data) {});


    var token = '328759248.2e06978.70cb8504405e43e6b6f6eb8a73cf3283',
      username = 'canlearningcode', // rudrastyh - my username :)
      num_photos = 12;

  $.ajax({ // the first ajax request returns the ID of user rudrastyh
  	url: 'https://api.instagram.com/v1/users/search',
  	dataType: 'jsonp',
  	type: 'GET',
  	data: {access_token: token, q: username}, // actually it is just the search by username
  	success: function(data){
  		$.ajax({
  			url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent', // specify the ID of the first found user
  			dataType: 'jsonp',
  			type: 'GET',
  			data: {access_token: token, count: num_photos},
  			success: function(data2){
  				for(x in data2.data){
  					$('#insta').append('<li class="ph1 w-2-ns w-4 fl mb2"><span class="db aspect-ratio aspect-ratio--1x1"><a class="aspect-ratio--object cover db" href="'+data2.data[x].link+'" target="_blank" style="background:url('+data2.data[x].images.standard_resolution.url+')"></a></span></li>');
  				}
      			},
  			error: function(data2){
  				console.log(data2);
  			}
  		});
  	},
  	error: function(data){
  		console.log(data);
  	}
  });
});
