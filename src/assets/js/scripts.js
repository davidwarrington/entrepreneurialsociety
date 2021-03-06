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
      target: '.navbar',
      offset: 54
    });
  
  })(jQuery); // End of use strict

  var event_data = [];

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
        "fields": "events",
        "access_token": "EAAFk58PB4DcBAHcATXLKnlKqqbmv6Vk0tiNIPGA6Fgwos42dqMFlZACF49SiNo3bAKw8scUs17xflBwZASrRZAydoWPzhaoK34t5cKdCrN87EIyPw171LRx0cHhFVji1arBTEd5EznM1cz327mQSxsrMoCe7SZCbHmF3RW71nZCIk3wVBI60E"
      },
      function(response) {

        var current_event = function(selector) {
          return $('.event-list li').eq(4 - i).find(selector);
        };

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        for(var i = 0; i < 5; i++) {
          var event = response.events.data[i];

          // Push each event to the event_data array to allow it to be used later
          event_data.push(event);

          var selectors = {
            // Time Selectors
            time: current_event('time'),            
            day: current_event('.day'),
            month: current_event('.month'),
            year: current_event('.year'),

            start: current_event('.start-time span'),
            end: current_event('.end-time span'),

            // Info Selectors
            title: current_event('.name-title'),
            desc: current_event('.desc'),

            // Button Selectors
            btn: current_event('.btn'),
            link: current_event('.event-extra-info .btn')
          };

          var start_time = new Date(parseDate(event.start_time));
          var end_time = new Date(parseDate(event.end_time));
          var event_date = {
            full: start_time.toString(),
            day: start_time.getDate(),
            month: months[start_time.getMonth()],
            year: start_time.getFullYear(),

            start: {
              hour: ('0' + start_time.getHours()).slice(-2),
              mins: ('0' + start_time.getMinutes()).slice(-2)
            },
            end: {
              hour: ('0' + end_time.getHours()).slice(-2),
              mins: ('0' + end_time.getMinutes()).slice(-2)
            }

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

          // Populate more-info location
          // selectors.start.html(event_date.start.hour + ':' + event_date.start.mins);
          // selectors.end.html(event_date.end.hour + ':' + event_date.end.mins);
          // selectors.link.attr('href', 'https://facebook.com/events/' + event.id);

          selectors.btn.attr('href', 'https://facebook.com/events/' + event.id);
          selectors.btn.html('Take Part');
        }
      }
    );
  });

  // $('#openBtn').click(function(){
  //   $('#myModal').modal({show:true})
  // });


//   function initMap() {
//   var uluru = {lat: -25.363, lng: 131.044};
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: uluru
//   });
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });
// };


// Populate modal on event more-info click
// $('.more').on('click', function() {
//   // Declare button clicked as variable (filter used later affects value of 'this')
//   // '$(this)' returns the element that caused the event
//   var current_button = $(this);

//   // Filter returns an array of JSON objects with the id given.
//   // Since the id is unique, [0] is used to return the first JSON object in the array
//   var current_event = event_data.filter(function(event) {
//     return event.id == current_button.attr('data-event-id');
//   })[0];
// });

/**
 * Change button text when user clicks to represent next action
 */
$('button.more-events').on('click', function () {
  var text = $(this).html();

  if (text == 'See More Events') {
    $(this).html('See Fewer Events');
  } else {
    $(this).html('See More Events');
  }
});


/**
 * parseDate
 * Returns a valid date string for Safari compatibility.
 * Replaces '-' in string with '/', replaces non-numeric characters with ' '
 * @param {string} date 
 */
function parseDate(date) {
  var parsed = Date.parse(date);
  if (!isNaN(parsed)) {
    return parsed;
  }

  return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
}

$('.nav-toggle').on('click', function(e) {
  $('.sidenav').toggleClass('sidenav-active');
});