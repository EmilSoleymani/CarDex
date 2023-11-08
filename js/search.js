/*
Author: Emil Soleymani
Last Modification: 2023-11-08
*/

/*
 * Populates the results page with the results of the search based on the query string.
 * If no query string is given, the search bar is displayed.
 */
function populateResults() {
    // Get element which is list of results
    var searchResults = document.getElementById('results-wrapper');
    
    // Set var params to map of query params and values
    var params = new URLSearchParams(window.location.search);

    if (!params || !params.get('search')) {
        // No params given or search param is empty
        // Display Search Bar
        document.getElementById('search-bar-wrapper').style.display = 'block';
        // Hide filters and search description
        document.getElementById('search-results-description').style.display = 'none';
        document.getElementById('filters-wrapper').style.display = 'none';
        // Hide searchResults
        searchResults.style.display = 'none';
    } else {
        // Hide Search Bar
        document.getElementById('search-bar-wrapper').style.display = 'none';
        // Display filters and search description
        document.getElementById('search-results-description').style.display = 'flex';
        document.getElementById('filters-wrapper').style.display = 'block';
        // Display searchResults
        searchResults.style.display = 'block';

        // Fetch results from API
        fetch('http://localhost:3001/data/api.json')
            .then(response => response.json())
            .then(data => {
                // Filter data to contain elements where "make" or "model" is in the search or match the regex string of make or model
                var filteredData = data.data.filter(d => d.make.toLowerCase().includes(params.get('search').toLowerCase()) || d.model.toLowerCase().includes(params.get('search').toLowerCase()));

                for (var d of filteredData) {
                    // Temporary: set d.img.src to ../imgs/porsche_911_993.jpg
                    d.img.src = '../imgs/porsche_911_993.jpeg'

                    // Create a new div with class "model-display-quick"
                    var div = document.createElement('div');
                    div.className = "model-display-quick";

                    // Create a new h1 with class "model-display-quickname"
                    var h1 = document.createElement('h1');
                    h1.className = "model-display-quick-name";
                    // Set innerHtml of h1 to d.make + ' ' + d.model
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
                    p1.innerHTML = d.specs.engine + ' | ' + d.specs.maxHorsepower;
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
                    p2.innerHTML = '0-60mph: ' + d.specs.zeroToSixty;
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
                    a.href = "results.html?search=" + d.make.toLowerCase() + '-' + d.model.toLowerCase();
                    a.className = "model-display-quick-learn-more";
                    a.innerHTML = "Learn More";
                    // Add img and a to div
                    div.appendChild(img3);
                    div.appendChild(a);
                    // Add div to searchResults
                    searchResults.appendChild(div);
                }
            })
            .catch(error => {
                console.error('Error fetching the JSON file:', error);
                // Handle any errors here
            });
    }
}

window.onload = function() {
    populateResults();
};
  