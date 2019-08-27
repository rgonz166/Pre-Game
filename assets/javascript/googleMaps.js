//if user clicks on current location button
var lat = 0;
var lon = 0;

$(document).ready(function () {

  // $("#map").hide();
  $('#current-location, #input-location').click(function (e) {
    e.preventDefault();
    if (this.id == 'current-location') {
      // currentLocation();
      getLocation();

    } else if (this.id == 'input-location') {
      getLocation();
      inputLocation();
    } else if (this.id == 'reset') {
      reset();
    }

  });
});


var map;


//get currentlocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLocation);
  }
}

function setLocation(p) {
  lat = p.coords.latitude;
  lon = p.coords.longitude;
  runCode(lat, lon);
}

function runCode(la, lo) {
  // coordinates(la, lo);
  barsSearch();
}

function showPosition(latit, longit) {

  lattt = latit;
  longgg = longit;
  // console.log(typeof (lattt));
  // console.log("lat: " + lattt);
  // console.log("long: " + longgg);
  initMap(lattt, longgg);

}

function initMap(lattt, longgg) { //works sometimes 
  var myLatLng = {
    lat: lattt,
    lng: longgg
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 12,
    styles: [{
        elementType: 'geometry',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#263c3f'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#6b9a76'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          color: '#38414e'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#212a37'
        }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#9ca5b3'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#1f2835'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#f3d19c'
        }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#2f3948'
        }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#17263c'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#515c6d'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#17263c'
        }]
      }
    ]
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    label: 'A',
    title: 'Hello World!'
  });
  moreMarkers();

}
//end of current location


//search a location
function inputLocation() { //for the search barb
  // e.preventDefault();
  // $(".form-1").hide();

  var userLocation = $('#input-search').val();
  var geocoder = new google.maps.Geocoder();
  var address = userLocation;

  geocoder.geocode({
    'address': address
  }, function (results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      var lat_1 = results[0].geometry.location.lat();
      var long_1 = results[0].geometry.location.lng();

      runCode(lat_1, long_1);

    }
  });
}

function enterMap(lat_1, long_1) { //takes in the lattitude and longitude
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
    label: 'A',
    title: 'Hello World!'
  });
  moreMarkers();
}


function moreMarkers() {
  var locs = storeLocations;
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

  for (var i = 0; i < locs.length; i++) {
    // var mylat ={
    //   lat:locs[i],
    //   lng:
    // }
    var n = i + 1
    var num = n.toString();
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locs[i][0], locs[i][1]),
      map: map,
      label: num,
      shape: shape

    });
  }
}



function currentLocation() {
  $("#map").show();
  $("#input-location").hide();
  $("#current-location").hide();


}

function reset() {
  $("form").hide();
  $("#current-location").show();
  $("#input-location").show();
  $("#map").hide();
}


//search bar location