// Yelp api

var longitude = 32.7157;
var latitude = 117.1611;
var yelpClientID = 'XeMH_vKd8Mm-rmj3QWBF5Q';
var yelpApiKey = 'ssPVBtHyaqwtWyJvqHRW24qlwpitFICGorpoIHxUJR-LoKpi0StKtRRdxGXek19oPHAfXelKVbUmrceV6hur0HXUsWxZTiJ7S3BRfa9Bp-YGfAWd_ftNzrDVe-1FXXYx';
// var yelpQuery = 'https://api.yelp.com/v3/businesses/'+yelpClientID+'/search?';
var yelpQuery = 'https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972';

// ajax calls
$.ajax({
    method: 'GET',
    url: yelpQuery
}).then(function(res){
    console.log(res);
});

