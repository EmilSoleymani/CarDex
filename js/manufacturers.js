$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3001/api/manufacturers',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Clear the list of manufacturers
            $('#manufacturers-list').empty();
            $.each(data, function(index, d) {
                addManufacturer($('#manufacturers-list'), d);
            });
        },
        error: function(error) {
            console.error('Error fetching the JSON file:', error);
            // Handle any errors here
        }
    });

    /**
     * Adds a new manufacturer to the list of manufacturers given the name of the manufacturer
     * @param {*} manufacturersList - The list element that displays manufacturers
     * @param {*} name - The name of the manufacturer
     */
    function addManufacturer(manufacturersList, name) {
        // Create new div with class="manufacturer-wrapper"
        var modelDiv = $('<div>').addClass('manufacturer-wrapper').click(function() {
            // Construct the search query using the manufacturer name
            var searchQuery = encodeURIComponent(name);
            // Redirect to the results page with the searchQuery as a URL parameter
            window.location.href = 'search.html?search=' + searchQuery;
        });

        // Replace spaces in name with underscores for the image filename
        var imgSrc = 'imgs/manufacturer_logos/' + name.replace(/\s+/g, '_') + '.png';

        // Create img with class="manufacturer-img" src=imgSrc alt=name + " logo"
        var img = $('<img>').addClass('manufacturer-img').attr('src', imgSrc).attr('alt', name + ' logo');

        // Create p with class="manufacturer-name" and set innerHTML to name
        var nameP = $('<p>').addClass('manufacturer-name').html(name);

        // Add img to div
        modelDiv.append(img);

        // Add p to div
        modelDiv.append(nameP);

        // Add div to manufacturersList
        manufacturersList.append(modelDiv);
    }
});