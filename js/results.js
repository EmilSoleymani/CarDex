/*
 * Displays the results of a search query on the results page
 */
function displayResultData(search) {
    var modelDisplay = document.getElementById('model-display-full');
    // Empty modelDisplay
    modelDisplay.innerHTML = '';

    // Get the data from the api
    fetch('http://localhost:3001/data/api.json')
            .then(response => response.json())
            .then(data => {
                // Filter data to find the entry where entry.year + ' ' + entry.make + ' ' + entry.model == search
                var resultData = data.data.filter(d => d.year + ' ' + d.make + ' ' + d.model == search);
                // TODO: If data is empty, display error message and return
                if (data.length == 0) {
                    console.log('No results found');
                    return;
                }
                
                var d = resultData[0];
                d.img.src = '../imgs/porsche_911_993.jpeg';

                // Update page heading
                document.getElementById('model-display-full-name').innerHTML = d.year + ' ' + d.make + ' ' + d.model;

                // Create new img with class="model-display-full-img" src=d.img.src alt=d.img.alt
                var img = document.createElement('img');
                img.className = 'model-display-full-img';
                img.src = d.img.src;
                img.alt = d.img.alt;

                // Create new table with class="model-display-full-table"
                var table = document.createElement('table');
                table.className = 'model-display-full-table';
                
                // For each key in d.specs:
                for (var key in d.specs) {
                    // Create new tr
                    var tr = document.createElement('tr');
                    
                    // Set heading = key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")  (see https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-title-case-text)
                    var heading = key.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")
                    heading = heading.charAt(0).toUpperCase() + heading.slice(1);
                    if (heading == 'Zero To Sixty') {
                        heading = '0-60 mph';
                    }
                    // Create new th and set innerHTML to heading
                    var th = document.createElement('th');
                    th.innerHTML = heading;
                    // Create new td and set innerHTML to d.specs[key]
                    var td = document.createElement('td');
                    td.innerHTML = d.specs[key];
                    // Add key and value to tr
                    tr.appendChild(th);
                    tr.appendChild(td);
                    // Add tr to table
                    table.appendChild(tr);
                }

                // Add img and table to modelDisplay
                modelDisplay.appendChild(img);
                modelDisplay.appendChild(table);
            })
            .catch(error => console.log(error));    
}

function displayEmptyResults() {
    // Update page heading
    document.getElementById('model-display-full-name').innerHTML = '404 Not Found';
    var modelDisplay = document.getElementById('model-display-full');
    // Empty modelDisplay
    modelDisplay.innerHTML = '';
}

// COPIED FROM https://www.w3schools.com/js/js_cookies.asp /////////////

// Slightly modified for my needs.

function setCookie(cname) {
    const d = new Date();
    // Set cookie to expire in 24hrs
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    // Cookie name is going to be unique id for a car, the value will be set to true to let us know user has visited it in past 24hrs
    document.cookie = cname + "=true;" + expires;
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
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

window.onload = function() {
    // Set var params to map of query params and values
    var params = new URLSearchParams(window.location.search);

    if (!params || !params.get('search')) {
        displayEmptyResults();
    } else {
        // Remove encoding from search param
        var search = decodeURIComponent(params.get('search'));

        var cookie = getCookie(search)
        if (cookie === "") {
            // Make API call to add search result
            console.log('Adding search history for ' + search)
            // Set cookie
            setCookie(search)
        }

        displayResultData(search)
    }
};