 /*mnimmum number of rooms*/
$(function() {
    $("#roomMin").spinner({     /*#roomMin - id from min rooms*/
        min: 0,
        max: 7,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

 /*maximmmum number of rooms*/
$(function() {
    $("#roomMax").spinner({     /*#roomMax- id from max rooms*/
        min: 0,
        max: 7,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

/*type of the property*/
$(function() {
    $("#type").selectmenu();    /*#type- id from type of the property*/
});

/*date added*/
$(function() {
    $("#date").selectmenu();    /*#date- id from date added*/
});

/*price range*/
$(function() {
    $("#price").slider({        /*#price- id from max & min prices*/
        range:true,
        min: 249500,  /*min price of the json file*/
        max: 750000,  /*max price from the json file*/
        values: [ 75, 300 ],
        slide: function( event, ui ){
            $("#total").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );  /*#total- input id from goldSliderText*/
        }
    });

    $("#total").val(" £" + $(" #price").slider( "values", 0 ) + " - £" + $("#price").slider( "values", 1 ) );   /*#price- section id from max & min prices*/
});

/*search button*/
$(function() {
    $( "#Search" ).on("click", function(){

        var Type = $("#type").val();            /*type of the property*/
        var maxRoom =  $("#roomMin").val();      /*minimmum number of rooms*/
        var minRoom =  $("#roomMax").val();      /*maximmum number of rooms*/
        var date =  $("#date").val();             /*date added*/
        var minPrice = $("#price").slider("option", "values")[0];    /*minimmum price range*/
        var maxPrice = $("#price").slider("option", "values")[1];     /*maximmum price range*/

        var output="<ul>";
        for (var i in data.properties) {  /*i for properties id*/
            if (( Type == data.properties[i].type) || (Type=="Any"))
                if (( minRoom >= data.properties[i].bedrooms && maxRoom <= data.properties[i].bedrooms ))
                    if (( date == data.properties[i].added.month) || (date=="Anytime"))
                        if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
                        {
                            {
                                {
                                    {    /*display price,image,location & link for the property page....search result*/
                                        output+="<h2><li>" + "£" + data.properties[i].price +"</li></h2>" + "<img id='img1' src=" + data.properties[i].picture + ">" + "<p>" + data.properties[i].description + "</p>" + "<button><a href='" + data.properties[i].url + "'> View </a></button>" + "<p><a href='" + data.properties[i].url + "'>Visit Page</a></p>";
                                    } } } } }
        output+="</ul>";
        document.getElementById( "searching1" ).innerHTML = output;  /*'searchinf1'-id from the seach button*/
    });
});

/*Add to favourites button*/
$(function() {
    $( ".add" ).on("click", function(){

        try {
            $(this).attr('disabled', true);

            var propAdd = $(this).closest("p").attr("id");       /*'propAdd'-giving name for the add properties*/

            var myFavourite=JSON.parse(localStorage.getItem("fav")); /*'myFavorite'-giving name for the favourites items,,, 'fav'-giving name for*/

            if(myFavourite == null) {
                myFavourite = [];
            }

            if(myFavourite != null) {
                for ( var j = 0; j < myFavourite.length; j++) {     /*j for favorites proprties*/

                    if ( propAdd == myFavourite[j]) {

                        alert("Already added to your favourites");
                        myFavourite = [];
                    }
                }
            }

            myFavourite.push(propAdd);

            localStorage.setItem("fav", JSON.stringify(myFavourite));

        }

        catch (e) {
            if (e==QUOTA_EXCEEDED_ERR) {
                console.log("Error: Local storage limit exceeds");
            }

            else {
                console.log("ERROR: Saving to local storge.");
            }
        }
    });
});



/*remove favourites button*/
$(function() {
    $( ".remove" ).on("click", function(){

        $(this).attr('disabled', true);

        var propRemove = $(this).closest("p").attr("id");   /*'propRemove'-giving name for the remove favourites properties*/

        myFavourite=JSON.parse(localStorage.getItem("fav"));


        if(myFavourite != null) {
            for ( var j = 0; j < myFavourite.length; j++) {

                if ( propRemove == myFavourite[j]) {

                    alert("Property has been removed from Favourites");

                    delete myFavourite[j];

                    localStorage.setItem("fav", JSON.stringify(myFavourite));

                    myFavourite[j] = [];
                }
            }
        }

        if(myFavourite == null) {
            alert("No favourite properties");
        }
    });
});

/*view favourtite button*/
$(function() {
    $( ".view" ).on("click", function(){

        console.log("Restoring array data from local storage");

        myFavourite=JSON.parse(localStorage.getItem("fav"));

        var output = "<ul>";

        if (myFavourite != null) {

            for (var i = 0; i < data.properties.length; i++) {
                for (j = 0; j < myFavourite.length; j++) {

                    if (data.properties[i].id == myFavourite[j]) {
                            /*display favourites properties*/
                        output+="<h4><li>" + data.properties[i].bedrooms + " Bedroom," + " " + data.properties[i].type + " ,£" + " " + data.properties[i].price + "</li></h4>" +
                            "<img id='img2' src=" + data.properties[i].picture + ">" +"<button><a href=' " +data.properties[i].url + "'>View</a></button>";
                    }
                }
            }
        }
        output+="</ul>";

        document.getElementById( "searching2" ).innerHTML = output; /*id from favourites button*/

    });
});

/*remove favourites button in search page*/
$(function() {
    $( ".clear" ).on("click", function(){

        $("#searching2").remove();  /*id from favourites button*/

        myFavourite=JSON.parse(localStorage.getItem("fav"));

        localStorage.clear();

    });

});


