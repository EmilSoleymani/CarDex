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
            $.ajax({
                url: 'http://localhost:3001/api/gasPrice?lat=' + latitude + '&long=' + longitude,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    $('#estimated-gas-title').html('Estimated Gas Price in ' + data.country);
                    $('#estimated-gas-amt').html('$' + data.gasoline + ' USD/gal');                    
                },
                error: function(error) {
                    console.error('Error fetching the JSON file:', error);
                    // Handle any errors here
                }
            });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
        
        // API Call to Gas Canada
    }
});