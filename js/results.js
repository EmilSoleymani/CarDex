/*
Author: Emil Soleymani
Last Modification: 2023-11-13
*/

$(document).ready(function() {
    /**
     * Displays the results of a search query on the results page
     * @param {string} search The search query
     */
    function displayResultData(search) {
        var modelDisplay = $('#model-display-full');
        // Empty modelDisplay
        modelDisplay.empty();

        // Get the data from the api
        $.ajax({
            url: 'http://localhost:3001/',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // Filter data to find the entry where entry.year + ' ' + entry.make + ' ' + entry.model == search
                var resultData = data.data.filter(function(d) {
                    return d.year + ' ' + d.make + ' ' + d.model == search;
                });
                // TODO: If data is empty, display error message and return
                if (resultData.length === 0) {
                    console.log('No results found');
                    return;
                }

                var d = resultData[0];
                d.img.src = '../imgs/porsche_911_993.jpeg';

                // Update page heading
                $('#model-display-full-name').text(d.year + ' ' + d.make + ' ' + d.model);

                // Create new img with class="model-display-full-img" src=d.img.src alt=d.img.alt
                var img = $('<img>').addClass('model-display-full-img').attr('src', d.img.src).attr('alt', d.img.alt);

                // Create new table with class="model-display-full-table"
                var table = $('<table>').addClass('model-display-full-table');

                // For each key in d.specs:
                for (var key in d.specs) {
                    // Create new tr
                    var tr = $('<tr>');

                    // Set heading = key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")  (see https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-title-case-text)
                    var heading = key.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
                    heading = heading.charAt(0).toUpperCase() + heading.slice(1);
                    if (heading == 'Zero To Sixty') {
                        heading = '0-60 mph';
                    }
                    // Create new th and set innerHTML to heading
                    var th = $('<th>').html(heading);
                    // Create new td and set innerHTML to d.specs[key]
                    var td = $('<td>').html(d.specs[key]);
                    // Add key and value to tr
                    tr.append(th);
                    tr.append(td);
                    // Add tr to table
                    table.append(tr);
                }

                // Add img and table to modelDisplay
                modelDisplay.append(img);
                modelDisplay.append(table);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function displayEmptyResults() {
        // Update page heading
        $('#model-display-full-name').text('404 Not Found');
        var modelDisplay = $('#model-display-full');
        // Empty modelDisplay
        modelDisplay.empty();
    }

    // COPIED FROM https://www.w3schools.com/js/js_cookies.asp /////////////

    // Slightly modified for my needs.

    function setCookie(cname) {
        var d = new Date();
        // Set cookie to expire in 24hrs
        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // Cookie name is going to be a unique id for a car, the value will be set to true to let us know the user has visited it in the past 24hrs
        document.cookie = cname + "=true;" + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    //////////////////////////////////////////////////////////////////

    var params = new URLSearchParams(window.location.search);

    if (!params || !params.get('search')) {
        displayEmptyResults();
    } else {
        var search = decodeURIComponent(params.get('search'));

        var cookie = getCookie(search);
        if (cookie === "") {
            console.log('Adding search history for ' + search);
            // Set cookie
            setCookie(search);
            // Make POST request to /api/addSearch with search=search
            $.ajax({
                url: 'http://localhost:3001/api/addSearch/' + search,
                method: 'POST',
                dataType: 'json',
                success: function(data) {
                    console.log('Successfully added search history for ' + search);
                },
                error: function(error) {
                    console.error('Error adding search history for ' + search, error);
                }
            });
        }

        displayResultData(search);
    }
});