// Yelp api
// var slider = $('#range-slider');
var output = $('.demo');
var lA = 0;
var lO = 0;
var storeLocations = [];

output.text(slider.val() + " miles");

slider.on('input',function(){
    var sliderValue = 0;
    sliderValue = this.value;
    if(sliderValue == 1){
        output.text("(<1) miles");
    }
    else{
        output.text(sliderValue + " miles");
    }
})

function coordinates(lattt, longgg){
    lA = lattt;
    lO = longgg;
}

function barsSearch(){
// Query String Addons
    var termString = '&term=bars';
    var location = "&latitude=" + lA +"&longitude=" + lO;

    var yelpApiKey = 'ssPVBtHyaqwtWyJvqHRW24qlwpitFICGorpoIHxUJR-LoKpi0StKtRRdxGXek19oPHAfXelKVbUmrceV6hur0HXUsWxZTiJ7S3BRfa9Bp-YGfAWd_ftNzrDVe-1FXXYx';
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&limit=10&sort_by=rating" + termString + location;
        $.ajax({
            url: myurl,
            headers: {
                'Authorization':'Bearer ' +yelpApiKey,
            },
            method: 'GET',
            dataType: 'json',
            }).then(function(data){
                storeLocations = [];
                    console.log(data);
                    for(var i =0;i<data.businesses.length;i++){
                        var tempArray = [];
                        console.log(data.businesses[i].image_url);
                        var currentLat = data.businesses[i].coordinates.latitude;
                        var currentLong = data.businesses[i].coordinates.longitude;
                        // moreMarkers(currentLat,currentLong);
                        tempArray.push(currentLat);
                        tempArray.push(currentLong);
                        storeLocations.push(tempArray);
                    }
                    showPosition(lA,lO);
        });
}
function loadData(){
    var b = $('.businesses');
    var address = $('<p>');
    var pic = $('<img>');
    // address
    
}