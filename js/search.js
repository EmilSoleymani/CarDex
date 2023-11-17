/*
Author: Emil Soleymani
Last Modification: 2023-11-08
*/

/*
 * Updates the year filter to make sense with the search results.
 * @param {number} minYear - The minimum year in the search results.
 * @param {number} maxYear - The maximum year in the search results.
 * @return {void}
 * @example
 * updateYearFilter(1990, 2020); // Updates the year filter to include options from 1990 to 2020.
 */
function updateYearFilter(minYear, maxYear) {
    // Get minYearSelect and maxYearSelect elements
    var minYearSelect = document.getElementById('min-year-filter-select');
    var maxYearSelect = document.getElementById('max-year-filter-select');
    
    // Clear minYearSelect and maxYearSelect
    minYearSelect.innerHTML = '';
    maxYearSelect.innerHTML = '';

    // Add 'Any' option to minYearSelect and maxYearSelect
    var option = document.createElement('option');
    option.value = 0;
    option.innerHTML = 'Any';
    minYearSelect.appendChild(option);
    var option = document.createElement('option');
    option.value = 0;
    option.innerHTML = 'Any';
    maxYearSelect.appendChild(option);

    // Add options for each year from minYear to maxYear
    for (var i = minYear; i <= maxYear; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        minYearSelect.appendChild(option);
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        maxYearSelect.appendChild(option);
    }
}

/*
 * Updates the price slider's max price value if the max price possible on slider is less than the current max price.
 */
function updatePriceSlider(maxPrice) {
    var toSlider = document.getElementById('toSlider');
    var fromSlider = document.getElementById('fromSlider');
    if (toSlider.max < maxPrice) {
        toSlider.max = maxPrice;
        fromSlider.max = maxPrice;
    }
}

/**
 * Applies filters to the given data.
 * @param {*} data - The data to apply the filters to.
 * @returns The filtered data.
 */
function applyFilters(data) {
    // Get minYearSelect and maxYearSelect elements
    var minYearSelect = document.getElementById('min-year-filter-select');
    var maxYearSelect = document.getElementById('max-year-filter-select');
    // Get minYear and maxYear from minYearSelect and maxYearSelect
    var minYear = minYearSelect.options[minYearSelect.selectedIndex].value;
    var maxYear = maxYearSelect.options[maxYearSelect.selectedIndex].value;
    // Filter data by year if minYear or maxYear is not 0 (Any)
    if (minYear && minYear != 0) {
        data = data.filter(d => d.year >= minYear);
    }
    if (maxYear && maxYear != 0) {
        data = data.filter(d => d.year <= maxYear);
    }

    // Get fromSlider and toSlider elements
    var fromSlider = document.getElementById('fromSlider');
    var toSlider = document.getElementById('toSlider');
    // Get fromPrice and toPrice from fromSlider and toSlider
    var fromPrice = parseInt(fromSlider.value);
    var toPrice = parseInt(toSlider.value);
    // Filter data by price if fromPrice or toPrice
    data = data.filter(d => d.price >= fromPrice);
    data = data.filter(d => d.price <= toPrice);

    // Get automatic-transmission and manual-transmission checkboxes values
    var automaticTransmission = document.getElementById('automatic-transmission').checked;
    var manualTransmission = document.getElementById('manual-transmission').checked;
    data = data.filter(d => {
        // If neither automaticTransmission and manualTransmission are checked, return false
        if(!automaticTransmission && !manualTransmission) {
            return false;
        }

        // If both automaticTransmission and manualTransmission are checked, return true (maybe saves some time?)
        if(automaticTransmission && manualTransmission) {
            return true;
        }

        // Check if automaticTransmission is checked and d.specs.transmission contains 'automatic'
        if(automaticTransmission && d.specs.transmission.toLowerCase().includes('automatic')) {
            return true;
        }
        // Check if manualTransmission is checked and d.specs.transmission contains 'manual'
        if(manualTransmission && d.specs.transmission.toLowerCase().includes('manual')) {
            return true;
        }

        // PDK, CVT
        if(!d.specs.transmission.toLowerCase().includes('automatic') && !d.specs.transmission.toLowerCase().includes('manual')){
            return true;
        }

        return false;
    });

    return data;
}

/**
 * Populates the results page with the given data. Updates the search results description and filters.
 * @param {*} searchResults - The element which is the list of results.
 * @param {*} filteredData - The data to populate the results page with.
 * @param {*} searchQuery - The search query. If empty, the search results description will not be updated. (only number of results will be updated)
 */
function populateResultsGivenData(searchResults, filteredData, searchQuery='') {
    // Clear searchResults
    searchResults.innerHTML = '';

    // Update search-results-description
    document.getElementById('search-results-count').innerHTML = filteredData.length
    if (searchQuery) {
        document.getElementById('search-results-search-param-label').innerHTML = searchQuery
    }

    // Update filters to make sense with the search results
    var maxPrice = Math.max(...filteredData.map(d => d.price));
    updatePriceSlider(maxPrice);

    for (var d of filteredData) {
        // Temporary: set d.img.src to ../imgs/porsche_911_993.jpg
        d.img.src = '../imgs/porsche_911_993.jpeg'

        // Create a new div with class "model-display-quick"
        var div = document.createElement('div');
        div.className = "model-display-quick";

        // Create a new h1 with class "model-display-quickname"
        var h1 = document.createElement('h1');
        h1.className = "model-display-quick-name";
        // Set innerHtml of h1 to d.year + ' ' d.make + ' ' + d.model
        h1.innerHTML = d.make + ' ' + d.model;
        // Add h1 to div
        div.appendChild(h1);
        
        // Create a new div called info1 with class "model-display-quick-info-wrapper"
        var info1 = document.createElement('div');
        info1.className = "model-display-quick-info-wrapper";
        // Create img with src="imgs/icons/engine.png", alt="Engine Icon", class="model-display-quick-info-icon"
        var img1 = document.createElement('img');
        img1.src = "imgs/icons/engine.png";
        img1.alt = "Engine Icon";
        img1.className = "model-display-quick-info-icon";
        // Create p with class "model-display-quick-info" and set innerHTML to d.specs.engine + ' | ' + d.specs.maxHorsepower
        var p1 = document.createElement('p');
        p1.className = "model-display-quick-info";
        p1.innerHTML = d.specs.engine + ' | ' + d.specs.power;
        // Add img and p to info1
        info1.appendChild(img1);
        info1.appendChild(p1);

        // Create a new div called info2 with class "model-display-quick-info-wrapper"
        var info2 = document.createElement('div');
        info2.className = "model-display-quick-info-wrapper";
        // Create img with src="imgs/icons/dashboard.png", alt="Dashboard Icon", class="model-display-quick-info-icon"
        var img2 = document.createElement('img');
        img2.src = "imgs/icons/dashboard.png";
        img2.alt = "Dashboard Icon";
        img2.className = "model-display-quick-info-icon";
        // Create p with class "model-display-quick-info" and set innerHTML to '0-60mph: ' + d.specs.zeroToSixty
        var p2 = document.createElement('p');
        p2.className = "model-display-quick-info";
        p2.innerHTML = '0-60 mph: ' + d.specs.zeroToSixty;
        // Add img and p to info2
        info2.appendChild(img2);
        info2.appendChild(p2);
        // Add info1 and info2 to div
        div.appendChild(info1);
        div.appendChild(info2);

        // Create img with src=d.img.src, alt=d.img.alt, class="model-display-quick-img"
        var img3 = document.createElement('img');
        img3.src = d.img.src;
        img3.alt = d.img.alt;
        img3.className = "model-display-quick-img";
        // If d.img.lowsrc exists set lowsrc of img to d.img.lowsrc
        if (d.img.lowsrc) {
            img3.setAttribute('lowsrc', d.img.lowsrc);
        }
        // Create a href with a query string for make and model and class "model-display-quick-learn-more" and innerHTML of "Learn More"
        var a = document.createElement('a');
        a.href = "results.html?search=" + encodeURIComponent(d.year + ' ' + d.make + ' ' + d.model);
        a.className = "model-display-quick-learn-more";
        a.innerHTML = "Learn More";
        // Add img and a to div
        div.appendChild(img3);
        div.appendChild(a);
        // Add div to searchResults
        searchResults.appendChild(div);
    }
}

window.onload = function() {
    populateResults();

    // Add filterResults as event listener to min-year-filter-select and max-year-filter-select
    document.getElementById('min-year-filter-select').addEventListener('change', filterResults);
    document.getElementById('max-year-filter-select').addEventListener('change', filterResults);

    // Add filterResults as event listener to fromSlider and toSlider
    document.getElementById('fromSlider').addEventListener('change', filterResults);
    document.getElementById('toSlider').addEventListener('change', filterResults);

    // Add filterResults as event listener to automatic-transmission and manual-transmission checkboxes
    document.getElementById('automatic-transmission').addEventListener('change', filterResults);
    document.getElementById('manual-transmission').addEventListener('change', filterResults);
};

$(document).ready(function() {
    /**
     * Populates the results page with the results of the search based on the query string.
     * If no query string is given, the search bar is displayed.
     */
    function populateResults() {
        var searchResults = $('#results-wrapper');
        var params = new URLSearchParams(window.location.search);

        if (!params || !params.get('search')) {
            // No params given or search param is empty
            // Display Search Bar
            $('#search-bar-wrapper').css('display', 'block');
            // Hide filters and search description
            $('#search-results-description').css('display', 'none');
            $('#filters-wrapper').css('display', 'none');
            // Hide searchResults
            searchResults.css('display', 'none');
        } else {
            // Hide Search Bar
            $('#search-bar-wrapper').css('display', 'none');
            // Display filters and search description
            $('#search-results-description').css('display', 'flex');
            $('#filters-wrapper').css('display', 'block');
            // Display searchResults
            searchResults.css('display', 'block');

            $.ajax({
                url: 'http://localhost:3001/data/api.json',
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    var search = decodeURIComponent(params.get('search'));
                    let regex = new RegExp(search);
                    var filteredData = data.data.filter(function(d) {
                        return regex.test(d.make + ' ' + d.model);
                    });
                    
                    // Update filters to make sense with the search results
                    var minYear = Math.min(...filteredData.map(function(d) { return d.year; }));
                    var maxYear = Math.max(...filteredData.map(function(d) { return d.year; }));
                    updateYearFilter(minYear, maxYear);

                    filteredData = applyFilters(filteredData);

                    populateResultsGivenData(searchResults, filteredData, params.get('search'));
                },
                error: function(error) {
                    console.error('Error fetching the JSON file:', error);
                }
            });
        }
    }

    /**
     * Filters the results based on the filters. Called when the filters are changed.
     * @returns {void}
     */
    function filterResults() {
        var searchResults = $('#results-wrapper');
        var params = new URLSearchParams(window.location.search);

        if (!params || !params.get('search')) {
            return;
        } else {
            $.ajax({
                url: 'http://localhost:3001/data/api.json',
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    var search = decodeURIComponent(params.get('search'));
                    let regex = new RegExp(search);
                    var filteredData = data.data.filter(function(d) {
                        return regex.test(d.make + ' ' + d.model);
                    });

                    filteredData = applyFilters(filteredData);

                    populateResultsGivenData(searchResults, filteredData);
                },
                error: function(error) {
                    console.error('Error fetching the JSON file:', error);
                }
            });
        }
    }

    /**
     * Updates the year filter to make sense with the search results.
     * @param {*} minYear - The minimum year in the search results.
     * @param {*} maxYear - The maximum year in the search results.
     */
    function updateYearFilter(minYear, maxYear) {
        var minYearSelect = $('#min-year-filter-select');
        var maxYearSelect = $('#max-year-filter-select');

        minYearSelect.empty();
        maxYearSelect.empty();

        var option = $('<option>').val(0).text('Any');
        minYearSelect.append(option);
        maxYearSelect.append(option.clone());

        for (var i = minYear; i <= maxYear; i++) {
            option = $('<option>').val(i).text(i);
            minYearSelect.append(option);
            maxYearSelect.append(option.clone());
        }
    }

    /**
     * Updates the price slider's max price value if the max price possible on slider is less than the current max price.
     * @param {*} maxPrice - The maximum price in the search results.
     */
    function updatePriceSlider(maxPrice) {
        var toSlider = $('#toSlider');
        var fromSlider = $('#fromSlider');
        if (toSlider.attr('max') < maxPrice) {
            toSlider.attr('max', maxPrice);
            fromSlider.attr('max', maxPrice);
        }
    }

    /**
     * Applies filters to the given data.
     * @param {*} data - The data to apply the filters to.
     * @returns - The filtered data.
     */
    function applyFilters(data) {
        var minYearSelect = $('#min-year-filter-select');
        var maxYearSelect = $('#max-year-filter-select');

        // Get minYear and maxYear from minYearSelect and maxYearSelect
        var minYear = minYearSelect.find('option:selected').val();
        var maxYear = maxYearSelect.find('option:selected').val();
        if (minYear && minYear != 0) {
            data = data.filter(function(d) {
                return d.year >= minYear;
            });
        }
        if (maxYear && maxYear != 0) {
            data = data.filter(function(d) {
                return d.year <= maxYear;
            });
        }

        // Get fromSlider and toSlider elements
        var fromSlider = $('#fromSlider');
        var toSlider = $('#toSlider');
        var fromPrice = parseInt(fromSlider.val());
        var toPrice = parseInt(toSlider.val());
        data = data.filter(function(d) {
            return d.price >= fromPrice;
        });
        data = data.filter(function(d) {
            return d.price <= toPrice;
        });

        // Get automatic-transmission and manual-transmission checkboxes values
        var automaticTransmission = $('#automatic-transmission').prop('checked');
        var manualTransmission = $('#manual-transmission').prop('checked');
        data = data.filter(function(d) {
            // If neither automaticTransmission and manualTransmission are checked, return false
            if (!automaticTransmission && !manualTransmission) {
                return false;
            }
            // If both automaticTransmission and manualTransmission are checked, return true (maybe saves some time?)
            if (automaticTransmission && manualTransmission) {
                return true;
            }
            if (automaticTransmission && d.specs.transmission.toLowerCase().includes('automatic')) {
                return true;
            }
            if (manualTransmission && d.specs.transmission.toLowerCase().includes('manual')) {
                return true;
            }
            // PDK, CVT, ...
            if (!d.specs.transmission.toLowerCase().includes('automatic') && !d.specs.transmission.toLowerCase().includes('manual')) {
                return true;
            }
            return false;
        });

        return data;
    }

    // Populates the results page with the given data. Updates the search results description and filters.
    function populateResultsGivenData(searchResults, filteredData, searchQuery) {
        searchResults.empty();

        $('#search-results-count').text(filteredData.length);
        if (searchQuery) {
            $('#search-results-search-param-label').text(searchQuery);
        }

        var maxPrice = Math.max(...filteredData.map(function(d) { return d.price; }));
        updatePriceSlider(maxPrice);

        for (var d of filteredData) {
            d.img.src = '../imgs/porsche_911_993.jpeg';  // Temporary: set d.img.src to ../imgs/porsche_911_993.jpg

            var div = $('<div>').addClass('model-display-quick');
            var h1 = $('<h1>').addClass('model-display-quick-name').html(d.make + ' ' + d.model);
            div.append(h1);

            var info1 = $('<div>').addClass('model-display-quick-info-wrapper');
            var img1 = $('<img>').attr('src', 'imgs/icons/engine.png').attr('alt', 'Engine Icon').addClass('model-display-quick-info-icon');
            var p1 = $('<p>').addClass('model-display-quick-info').html(d.specs.engine + ' | ' + d.specs.power);
            info1.append(img1);
            info1.append(p1);

            var info2 = $('<div>').addClass('model-display-quick-info-wrapper');
            var img2 = $('<img>').attr('src', 'imgs/icons/dashboard.png').attr('alt', 'Dashboard Icon').addClass('model-display-quick-info-icon');
            var p2 = $('<p>').addClass('model-display-quick-info').html('0-60 mph: ' + d.specs.zeroToSixty);
            info2.append(img2);
            info2.append(p2);

            div.append(info1);
            div.append(info2);

            var img3 = $('<img>').attr('src', d.img.src).attr('alt', d.img.alt).addClass('model-display-quick-img');
            if (d.img.lowsrc) {
                img3.attr('lowsrc', d.img.lowsrc);
            }

            var a = $('<a>').attr('href', 'results.html?search=' + encodeURIComponent(d.year + ' ' + d.make + ' ' + d.model)).addClass('model-display-quick-learn-more').html('Learn More');

            div.append(img3);
            div.append(a);
            searchResults.append(div);
        }
    }

    populateResults();

    // Add filterResults as event listener to all filters
    $('#min-year-filter-select').on('change', filterResults);
    $('#max-year-filter-select').on('change', filterResults);
    $('#fromSlider').on('change', filterResults);
    $('#toSlider').on('change', filterResults);
    $('#automatic-transmission').on('change', filterResults);
    $('#manual-transmission').on('change', filterResults);
});
