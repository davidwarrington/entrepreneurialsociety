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

  var event_data;

  $.ajaxSetup({ cache: true });
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '{141511146507788}',
      version: 'v2.11' // or v2.1, v2.2, v2.3, ...
    });
    
    FB.api(
      '/UCLanEntrepreneurialSociety',
      'GET',
      {
        "fields":"events",
        "access_token": "EAACAtCGejgwBAJfeLZCAYKZAaZCgTeQC2nMFxCAoSE1bKJcqpZAH7Iqp4fimDAOTsVJ712NIjZAZAX3DWnLMEaUATOlshYT4dq0oqM8oHERX1bWiPmDU8T2FmvrtgOUAlwpdaiqAd7rXeFgrQ5vdMrTbcWwFCd46nYB5wCupZBrUAZDZD"  
      },
      function(response) {

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        for(var i = 0; i < 5; i++) {
          var event = response.events.data[i];

          var selectors = {
            // Time Selector
            time: $('.event-list li:nth-of-type(' + (5 - i) + ') time'),
            day: $('.event-list li:nth-of-type(' + (5 - i) + ') .day'),
            month: $('.event-list li:nth-of-type(' + (5 - i) + ') .month'),
            year: $('.event-list li:nth-of-type(' + (5 - i) + ') .year'),

            // Info Selectors
            title: $('.event-list li:nth-of-type(' + (5 - i) + ') .name-title'),
            desc: $('.event-list li:nth-of-type(' + (5 - i) + ') .desc'),

            // Button Selector
            btn: $('.event-list li:nth-of-type(' + (5 - i) + ') .btn'),
          };

          var start_time = new Date(event.start_time);
          event_date = {
            full: start_time.toString(),
            day: start_time.getDate(),
            month: months[start_time.getMonth()],
            year: start_time.getFullYear()
          };

          // Populate time element
          selectors.time.attr('datetime', event_date.full);        
          selectors.day.html(event_date.day);
          selectors.month.html(event_date.month);
          selectors.year.html(event_date.year);

          // Populate Description
          selectors.title.html(event.name);
          selectors.desc.html(event.description);

          // Add data to button
          selectors.btn.attr('data-event-id', event.id);
        }
      }
    );
  });

  $('#openBtn').click(function(){
  $('#myModal').modal({show:true})
});


  function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
};
