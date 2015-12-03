'use strict';
$('.find').click(find);


function find(){
  $('#map').empty();
  var address = $('.address').val().split(' ').join('+');
  $.ajax({
    method: 'GET', 
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD4sce010CqoS9hM5xCEqOJ8U6sker2V60`
  })
  .done(function(res){
    console.log(res);
    $('.address').val(res.results[0].formatted_address)
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: res.results[0].geometry.location,
      zoom: 17
    });
    var marker = new google.maps.Marker({
    position: res.results[0].geometry.location,
    map: map,
    title: 'Found Location'
  });
  });
}


