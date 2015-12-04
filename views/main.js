'use strict';
load();
$('.find').click(find);
var map;
var poly;

function load(){
  $('#map').empty();

  navigator.geolocation.getCurrentPosition(function(position) {
    var location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 10
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Your Location'
    });
  });
}



function find(){
  $('#map').empty();
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

    poly = new google.maps.Polyline({
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      editable: true
    });
    poly.setMap(map);
    map.addListener('click', addLatLng);

    function addLatLng(event) {
      var path = poly.getPath();

      path.push(event.latLng);

      var marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength(),
        map: map
      });
      var coords = poly.getPath();
      console.log(coords);
    };


  });
}






