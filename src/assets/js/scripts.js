(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 54)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 54
    });
  
  })(jQuery); // End of use strict

  $(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
      FB.init({
        appId: '{141511146507788}',
        version: 'v2.11' // or v2.1, v2.2, v2.3, ...
      });
      
      FB.api(
        '/UCLanEntrepreneurialSociety',
        'GET',
        {"fields":"events",
         "access_token": "EAACAtCGejgwBABy60GZChkqKfWRDfBm8RjZB8qPcfQ9Y4Nh8ZCzegQMHEE7FwDnMd3Y7m1QRUjDkOURGnQRYHZAyWC8NZCpsEg7f7CdYpRIwmWtTLpYqVEm1yU26Fb5ZBiCUZAvIFZBfjgNeOIr13tQKAGpZBVLMWk788QRxDV7Q3LJZC2dawnvy4BBpvC1FClOfgZD"  
        },
        function(response) {
            console.log(response.events.data[0]);
            // $('#div1').html(response.events.data[0]);
        }
      );
    });
});