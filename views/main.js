'use strict';
$(document).ready(init);

function init(){
  load();
  $('.find').click(find);
}



var firebaseRef = new Firebase("https://yougle-maps.firebaseio.com/");
var geoFire = new GeoFire(firebaseRef);

var map;
var poly;
var coords;

function load(){
  $('#map').empty();

  navigator.geolocation.getCurrentPosition(function(position) {
    var location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
      
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Your Location'
    });
    setTimeout(function() {
      $('.locationNameForm').fadeIn(900);
    }, 3000);

    $('.saveLocation').click(saveLocation(location));

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
      var marker = new google.maps.Marker({
        position: res.results[0].geometry.location,
        map: map,
        title: 'Found Location'
      });
      setTimeout(function() {
        $('.locationNameForm').fadeIn(900);
      }, 3000);
    });
  }
}

function saveLocation(location){
  console.log("SAVE LOCATION", location);
}








