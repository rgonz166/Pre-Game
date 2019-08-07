// Yelp api
var slider = $('#range-slider');
var output = $('.demo');
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


$('.yelp-search').on('click',function(e){
    e.preventDefault();
    var b = $('#businesses');
    var term = $('#input-result').val().trim();


    // Query String Addons
    var termString = '&term=' + term;
    var location = "&latitude=32.715736&longitude=-117.161087";


    // var latitude = 32.715736;
    // var longitude = -117.161087;
    // var yelpClientID = 'XeMH_vKd8Mm-rmj3QWBF5Q';
    var yelpApiKey = 'ssPVBtHyaqwtWyJvqHRW24qlwpitFICGorpoIHxUJR-LoKpi0StKtRRdxGXek19oPHAfXelKVbUmrceV6hur0HXUsWxZTiJ7S3BRfa9Bp-YGfAWd_ftNzrDVe-1FXXYx';
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&limit=10&sort_by=rating" + termString + location;


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
                    var mainCard = $("<div>");
                    mainCard.addClass("row no-gutters");
                    mainCard.appendTo(b);

                    var cardLeft = $("<div>");
                    cardLeft.addClass("col-md-4");
                    cardLeft.appendTo(mainCard);

                    var imgHolder = $("<img>");
                    imgHolder.attr({
                        "src" : (data.businesses[i].image_url),
                        "class" : "card-img"
                    });
                    imgHolder.appendTo(cardLeft);

                    var cardRight = $("<div>");
                    cardRight.addClass("col-md-8");
                    cardRight.appendTo(mainCard);

                    var cardBody = $("<div>");
                    cardBody.addClass("card-body");
                    cardBody.appendTo(cardRight);

                    //card title w/ venue title

                    //card text w/ venue summary

                    //add rating and price

                    // var name = $('<p>');
                    // name.text(data.businesses[i].name);
                    // var pic = $('<img>');
                    // pic.attr('src', data.businesses[i].image_url);
                    // pic.attr('height', '200px');
                    // b.prepend(pic);
                    // b.prepend(name);
                    // console.log(data.businesses[i].image_url);
                }
            }
        }); 
})

function loadData(){
    var b = $('#businesses');
    var address = $('<p>');
    var pic = $('<img>');
    // address
    
}
