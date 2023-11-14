/*
Author: Emil Soleymani
Last Modification: 2023-11-13
*/

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3001/api/trendingModels',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $.each(data, function(index, d) {
                addTrendingModel($('#trending-models-list'), d);
            });
        },
        error: function(error) {
            console.error('Error fetching the JSON file:', error);
            // Handle any errors here
        }
    });

    /**
     * Given a list element of trending models and data about a model, adds a new model to the list
     * @param {*} trendingModelsList - The list element that displays trending models
     * @param {*} data - The data about a model
     */
    function addTrendingModel(trendingModelsList, data) {
        data.img.src = '../imgs/porsche_911_993.jpeg'; // Temporary: set data.img.src to ../imgs/porsche_911_993.jpg

        // Create new div with class="model-display-mini"
        var modelDiv = $('<div>').addClass('model-display-mini').click(function() {
            // Construct the search query using the year, make, and model from the data
            var searchQuery = encodeURIComponent(data.year + ' ' + data.make + ' ' + data.model);
            // Redirect to the results page with the searchQuery as a URL parameter
            window.location.href = 'results.html?search=' + searchQuery;
        });

        // Create new div called header with class="model-display-mini-name-wrapper"
        var headerDiv = $('<div>').addClass('model-display-mini-name-wrapper');

        // Create p with class="model-display-mini-name" and set innerHTML to data.make + " " + data.model
        var nameP = $('<p>').addClass('model-display-mini-name').html(data.make + ' ' + data.model);

        // Create new div called underline with class="model-display-mini-underline"
        var underlineDiv = $('<div>').addClass('model-display-mini-underline');

        // Add p and underline to header
        headerDiv.append(nameP);
        headerDiv.append(underlineDiv);

        // Add header to div
        modelDiv.append(headerDiv);

        // Create img with class="model-display-mini-img" src=data.img.src alt=data.img.alt
        var img = $('<img>').addClass('model-display-mini-img').attr('src', data.img.src).attr('alt', data.img.alt);

        // Create p with class="model-display-mini-specs" and set innerHTML to data.specs.engine + ' | ' + data.specs.power
        var specsP = $('<p>').addClass('model-display-mini-specs').html(data.specs.engine + ' | ' + data.specs.power);

        // Add img and p to div
        modelDiv.append(img);
        modelDiv.append(specsP);

        // Add div to trendingModelsList
        trendingModelsList.append(modelDiv);
    }
});
