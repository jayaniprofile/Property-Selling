$(function() {
    $("#roomMin").spinner({
        min: 0,
        max: 7,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

$(function() {
    $("#roomMax").spinner({
        min: 0,
        max: 7,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

$(function() {
    $("#type").selectmenu();
});

$(function() {
    $("#date").selectmenu();
});


$(function() {
    $("#price").slider({
        range:true,
        min: 249500,
        max: 750000,
        values: [ 75, 300 ],
        slide: function( event, ui ){
            $("#total").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
        }
    });

    $("#total").val(" £" + $(" #price").slider( "values", 0 ) + " - £" + $("#price").slider( "values", 1 ) );
});


$(function() {
    $( "#Search" ).on("click", function(){

        var Type = $("#type").val();
        var maxRoom =  $("#roomMin").val();
        var minRoom =  $("#roomMax").val();
        var date =  $("#date").val();
        var minPrice = $("#price").slider("option", "values")[0];
        var maxPrice = $("#price").slider("option", "values")[1];

        var output="<ul>";
        for (var i in data.properties) {
            if (( Type == data.properties[i].type) || (Type=="Any"))
                if (( minRoom >= data.properties[i].bedrooms && maxRoom <= data.properties[i].bedrooms ))
                    if (( date == data.properties[i].added.month) || (date=="Anytime"))
                        if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
                        {
                            {
                                {
                                    {
                                        output+="<h2><li>" + "£" + data.properties[i].price +"</li></h2>" + "<img src=" + data.properties[i].picture + ">" + "<p>" + data.properties[i].description + "</p>" + "<button><a href='" + data.properties[i].url + "'> View </a></button>" + "<p><a href='" + data.properties[i].url + "'>Visit Page</a></p>";
                                    } } } } }
        output+="</ul>";
        document.getElementById( "searching1" ).innerHTML = output;
    });
});

$(function() {
    $( ".add" ).on("click", function(){

        try {
            $(this).attr('disabled', true);

            var propAdd = $(this).closest("p").attr("id");

            var myFavourite=JSON.parse(localStorage.getItem("fav"));

            if(myFavourite == null) {
                myFavourite = [];
            }

            if(myFavourite != null) {
                for ( var j = 0; j < myFavourite.length; j++) {

                    if ( propAdd == myFavourite[j]) {

                        alert("This property is already in your favourites");
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




$(function() {
    $( ".remove" ).on("click", function(){

        $(this).attr('disabled', true);

        var propRemove = $(this).closest("p").attr("id");

        myFavourite=JSON.parse(localStorage.getItem("fav"));


        if(myFavourite != null) {
            for ( var j = 0; j < myFavourite.length; j++) {

                if ( propRemove == myFavourite[j]) {

                    alert("This Property has been removed");

                    delete myFavourite[j];

                    localStorage.setItem("fav", JSON.stringify(myFavourite));

                    myFavourite[j] = [];
                }
            }
        }

        if(myFavourite == null) {
            alert("You have no favourite items");
        }
    });
});


$(function() {
    $( ".view" ).on("click", function(){

        console.log("Restoring array data from local storage");

        myFavourite=JSON.parse(localStorage.getItem("fav"));

        var output = "<ul>";

        if (myFavourite != null) {

            for (var i = 0; i < data.properties.length; i++) {
                for (j = 0; j < myFavourite.length; j++) {

                    if (data.properties[i].id == myFavourite[j]) {

                        output+="<h5><li>" + data.properties[i].bedrooms + " Bedroom" + " " + data.properties[i].type + "</li></h5>" +
                            "<img src=" + data.properties[i].picture + ">" +"<li><button><a href=' " +data.properties[i].url + "'>Visit page</a></button></li>";
                    }
                }
            }
        }
        output+="</ul>";

        document.getElementById( "searching2" ).innerHTML = output;

    });
});


$(function() {
    $( ".clear" ).on("click", function(){

        $("#searching2").remove();

        myFavourite=JSON.parse(localStorage.getItem("fav"));

        localStorage.clear();

    });

});


