'use strict';
$(document).ready(init);

function init(){
  load();
  $('.find').click(find);
  $('.recenter').click(load);
  $('.container').on('click', '.saveLocation', saveLocation);

}



var firebaseRef = new Firebase("https://yougle-maps.firebaseio.com/");
var geoFire = new GeoFire(firebaseRef);

var map;
var poly;
var coords;
var userLocation;

function load(){
  $('#map').empty();

  navigator.geolocation.getCurrentPosition(function(position) {
    userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map = new google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom: 12
    });

    var youMarker = new google.maps.Marker({
      position: userLocation,
      map: map,
      icon: 'https://mt.google.com/vt/icon?psize=20&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-blue.png&ax=44&ay=48&scale=1&text=%E2%80%A2',
      title: 'Your Location'
    });

    setTimeout(function() {
      $('.locationNameForm').fadeIn(900);
    }, 2000);

    var geoQuery = geoFire.query({
      center: [userLocation.lat, userLocation.lng],
      radius: 8.05 //kilometers (5 miles)
    });

    geoQuery.on("key_entered", function(key, location, distance) {
      var lat = location.toString().split(',')[0];
      var lng = location.toString().split(',')[1];
      var marker = new google.maps.Marker({
        position: {lat: Number(lat), lng: Number(lng)},
        map: map,
        title: key
      });
      console.log(key + " found at " + location + " (" + distance + " km away)");
    });

    // google.maps.event.addListener(map, 'click', function(event) {
    //   userLocation = event.latLng
    //   placeMarker(userLocation, marker);
    // });

    // function placeMarker(userLocation, marker) {
    //   console.log(userLocation);
    //   marker.setMap(null);
    //   marker = null;

    //   marker = new google.maps.Marker({
    //     position: userLocation, 
    //     map: map
    //   });
    //   $('.locationNameForm').fadeOut(500).fadeIn(500);
    // };
  });
}

function find(){
  if ($('.addressInput').val()) {
    $('#map').empty();
    $('.locationNameForm').fadeOut(500);


    var address = $('.addressInput').val().split(' ').join('+');
    $.ajax({
      method: 'GET', 
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD4sce010CqoS9hM5xCEqOJ8U6sker2V60`
    })
    .done(function(res){
      $('.addressInput').val(res.results[0].formatted_address)
      map = new google.maps.Map(document.getElementById('map'), {
        center: res.results[0].geometry.location,
        zoom: 17
      });
      userLocation = res.results[0].geometry.location;
      var marker = new google.maps.Marker({
        position: res.results[0].geometry.location,
        map: map,
        title: 'Found Location'
      });
      setTimeout(function() {
        $('.locationNameForm').fadeIn(900);
      }, 2000);
    });
  }
}

function saveLocation(){
  if ($('.locationNameInput').val()){
    console.log("SAVE LOCATION", userLocation);
    var key = $('.locationNameInput').val();
    console.log("KEY", key);

    geoFire.set(key, [userLocation.lat, userLocation.lng]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    });


  }
  
}








