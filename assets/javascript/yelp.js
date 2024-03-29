// Yelp api
var output = $('.demo');
var lA = 0;
var lO = 0;
var storeLocations = [];


function coordinates(lattt, longgg){//this is called on googleMaps.js 
    lA = lattt;
    lO = longgg;
}

function barsSearch(){
    var b = $('#businesses');

    // Query String Addons
   
    var termString = "bars"
    var location = "&latitude=" + lA +"&longitude=" + lO;

    var yelpApiKey = 'ssPVBtHyaqwtWyJvqHRW24qlwpitFICGorpoIHxUJR-LoKpi0StKtRRdxGXek19oPHAfXelKVbUmrceV6hur0HXUsWxZTiJ7S3BRfa9Bp-YGfAWd_ftNzrDVe-1FXXYx';
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&limit=10&sort_by=rating&term=" + termString + location;


    $.ajax({
        url: myurl,
        headers: {
            'Authorization': 'Bearer ' + yelpApiKey,
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            storeLocations = [];
            console.log(data);
            for(var i =0;i<data.businesses.length;i++){
                var tempArray = [];
                var currentLat = data.businesses[i].coordinates.latitude;
                var currentLong = data.businesses[i].coordinates.longitude;

                tempArray.push(currentLat);
                tempArray.push(currentLong);
                storeLocations.push(tempArray);
            }
            b.empty();
            drawList(data);
            showPosition(lA,lO);
            $("input-search").val("");
        }
    });
}

function drawList(data) {
    data.businesses.forEach(function(business, i) {
        
        console.log('business', business)
        var ratingSprite = "./assets/images/star1.png";
        var priceSprite = "./assets/images/price1.png";
        var busRating = Math.floor(business.rating)
        var busPrice = business.price;
        var priceVar;
        console.log(`business ${i} price is: ${busPrice}`);


        var mainCard = $("<div>");
        mainCard.addClass("row no-gutters m-3");
        mainCard.appendTo("#businesses");

        var cardLeft = $("<div>");
        cardLeft.addClass("col-sm-4");
        cardLeft.appendTo(mainCard);

        var imgHolder = $("<img>");
        imgHolder.attr({
            "src": (business.image_url),
            "class": "card-img",
            "height": "100px",
            "max-width": "100px"
        });
        imgHolder.appendTo(cardLeft);

        var cardMiddle = $("<div>");
        cardMiddle.addClass("col-sm-4");
        cardMiddle.appendTo(mainCard);

        var cardBodyMiddle = $("<div>");
        cardBodyMiddle.addClass("card-body");
        cardBodyMiddle.appendTo(cardMiddle);

        var cardRight = $("<div>");
        cardRight.addClass("col-sm-4");
        cardRight.appendTo(mainCard);

        var cardBodyRight = $("<div>");
        cardBodyRight.addClass("card-body text-right");
        cardBodyRight.appendTo(cardRight);

        var cardTitle = $("<h5>");
        cardTitle.addClass("card-title");
        cardTitle.text((i+1) + ". " + business.name);
        cardTitle.appendTo(cardBodyMiddle);

        var cardRating = $("<div>");
        var ratingAmount = $("<span>");
        var ratingHeader = $("<h6>Rating: </h6>");
        for (var j = 0; j < busRating; j++) {
            $("<img>").attr({
                "src": ratingSprite,
                "style": "width:16px"
            }).appendTo(ratingAmount);
        }
        ratingAmount.appendTo(ratingHeader);
        ratingHeader.appendTo(cardRating);
        cardRating.appendTo(cardBodyRight);

        switch (busPrice) {
            case ("$$$$"):
                priceVar = 4;
                break;
            case ("$$$"):
                priceVar = 3;
                break;
            case ("$$"):
                priceVar = 2;
                break;
            case ("$"):
                priceVar = 1;
                break;
        }

        var cardPrice = $("<div>");
        cardPrice.addClass("text-right");
        var priceAmount = $("<span>");
        var priceHeader = $("<h6>Price: </h6>");
        for (var k = 0; k < priceVar; k++) {
            $("<img>").attr({
                "src": priceSprite,
                "style": "width:16px"
            }).appendTo(priceAmount);
        }
        priceAmount.appendTo(priceHeader);
        priceHeader.appendTo(cardPrice);
        cardPrice.appendTo(cardBodyRight);

        if (business.is_closed == false) {
            $("<h6>").text("Currently open.").appendTo(cardBodyRight);
        } else
            $("<h6>").text("Currently closed.").appendTo(cardBodyRight);
            
            var address = business.location && business.location.display_address;
            if (address && address.length) {
                $("<h6>").html(address[0]).appendTo(cardBodyMiddle);
                $("<h6>").html(address[1]).appendTo(cardBodyMiddle);
            }
            


    });

}