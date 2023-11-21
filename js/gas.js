/*
Author: Emil Soleymani
Last Modification: 2023-11-21
*/

$(document).ready(function() {
    var latitude, longitude, found;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            // API Call to Gas from long and lat
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
        
        // API Call to Gas Canada
    }
});