// Yelp api
var slider = $('#range-slider');
var output = $('.demo');
output.text(slider.val());

// slider.on('input',function(){
//     console.log(this);
    
//     output.text(this.val());
// })


$('.yelp-search').on('click',function(e){
    e.preventDefault();
    var b = $('.businesses');
    var term = $('#input-result').val().trim();


    // Query String Addons
    var termString = '&term=' + term;


    // var latitude = 32.715736;
    // var longitude = -117.161087;
    // var yelpClientID = 'XeMH_vKd8Mm-rmj3QWBF5Q';
    var yelpApiKey = 'ssPVBtHyaqwtWyJvqHRW24qlwpitFICGorpoIHxUJR-LoKpi0StKtRRdxGXek19oPHAfXelKVbUmrceV6hur0HXUsWxZTiJ7S3BRfa9Bp-YGfAWd_ftNzrDVe-1FXXYx';
    // // var yelpQuery = 'https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude='+longitude;
    // var yelpQuery = 'https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972';
    
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=32.715736&longitude=-117.161087&limit=10&sort_by=rating" + termString;


        $.ajax({
            url: myurl,
            headers: {
                'Authorization':'Bearer ' +yelpApiKey,
            },
            method: 'GET',
            dataType: 'json',
            success: function(data){
                console.log(data);
                for(var i =0;i<data.businesses.length;i++){
                    var name = $('<p>');
                    name.text(data.businesses[i].name);
                    var pic = $('<img>');
                    pic.attr('src', data.businesses[i].image_url);
                    pic.attr('height', '200px');
                    b.prepend(pic);
                    b.prepend(name);
                    console.log(data.businesses[i].image_url);
                }
            }
        }); 
})

function loadData(){
    var b = $('.businesses');
    var address = $('<p>');
    var pic = $('<img>');
    // address
    
}
