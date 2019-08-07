//if user clicks on current location button
$(document).ready(function () {

  $("#map").hide();
  $('#current-location, #input-location, #reset').click(function () {
    if (this.id == 'current-location') {
      currentLocation();
      getLocation();

    } else if (this.id == 'input-location') {
      $("#map").hide();
      inputLocation();
    }
    else if(this.id == 'reset'){
      reset();
    }

  });
});


var map;


//get currentlocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {

  lattt = position.coords.latitude;
  longgg = position.coords.longitude;
  console.log(typeof (lattt));
  console.log("lat: " + lattt);
  console.log("long: " + longgg);
  initMap(lattt, longgg)

  // x.innerHTML = "Latitude: " + position.coords.latitude + 
  // "<br>Longitude: " + position.coords.longitude;
}

function initMap(lattt, longgg) { //works sometimes 
  var myLatLng = {
    lat: lattt,
    lng: longgg
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 12
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    label:'A',
    title: 'Hello World!'
  });
}
//end of current location


//search a location
function inputLocation(){//for the search barb
  $("body").append("<form>"+"Enter Location:"+"<input id=address placeholder='Enter a Location'><button id=submit>Search</button></form>");
  $("#current-location").hide();
$("#input-location").hide();

$('#submit').click(function(e){
  e.preventDefault();
  var userLocation = $("#address").val();
  console.log(userLocation);
  var geocoder = new google.maps.Geocoder();
  var address = userLocation;
  
  geocoder.geocode( { 'address': address}, function(results, status) {
  
  if (status == google.maps.GeocoderStatus.OK) {
      var lat_1 = results[0].geometry.location.lat();
      var long_1 = results[0].geometry.location.lng();
     console.log("latitude of entered location: " + lat_1 +" longitute: " + long_1);
     enterMap(lat_1,long_1);

      } 
  }); 

  function enterMap(lat_1, long_1) { //works sometimes 
    $("#map").show();
    var myLatLng = {
      lat: lat_1,
      lng: long_1
    };
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      label:'A',
      title: 'Hello World!'
    });
  }

  


});

}

function currentLocation(){
  $("#map").show();
  $("#input-location").hide();
  $("#current-location").hide();


}

function reset(){
  $("form").hide();
  $("#current-location").show();
  $("#input-location").show();
  $("#map").hide();
}


//search bar location
