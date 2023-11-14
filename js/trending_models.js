/*
Author: Emil Soleymani
Last Modification: 2023-11-13
*/

function addTrendingModel(trendingModelsList, data) {
    data.img.src = '../imgs/porsche_911_993.jpeg'; // Temporary: set data.img.src to ../imgs/porsche_911_993.jpg

    // Create new div with class="model-display-mini"
    var modelDiv = document.createElement('div');
    modelDiv.className = 'model-display-mini';
    modelDiv.onclick = function() {
        // Construct the search query using the year, make, and model from the data
        var searchQuery = encodeURIComponent(data.year + ' ' + data.make + ' ' + data.model);
        // Redirect to the results page with the searchQuery as a URL parameter
        window.location.href = 'results.html?search=' + searchQuery;
    };

    // Create new div called header with class="model-display-mini-name-wrapper"
    var headerDiv = document.createElement('div');
    headerDiv.className = 'model-display-mini-name-wrapper';

    // Create p with class="model-display-mini-name" and set innerHTML to data.make + " " + data.model
    var nameP = document.createElement('p');
    nameP.className = 'model-display-mini-name';
    nameP.innerHTML = data.make + ' ' + data.model;

    // Create new div called underline with class="model-display-mini-underline"
    var underlineDiv = document.createElement('div');
    underlineDiv.className = 'model-display-mini-underline';

    // Add p and underline to header
    headerDiv.appendChild(nameP);
    headerDiv.appendChild(underlineDiv);

    // Add header to div
    modelDiv.appendChild(headerDiv);

    // Create img with class="model-display-mini-img" src=data.img.src alt=data.img.alt
    var img = document.createElement('img');
    img.className = 'model-display-mini-img';
    img.src = data.img.src;
    img.alt = data.img.alt;

    // Create p with class="model-display-mini-specs" and set innerHTML to data.specs.engine + ' | ' + data.specs.power
    var specsP = document.createElement('p');
    specsP.className = 'model-display-mini-specs';
    specsP.innerHTML = data.specs.engine + ' | ' + data.specs.power;

    // Add img and p to div
    modelDiv.appendChild(img);
    modelDiv.appendChild(specsP);

    // Add div to trendingModelsList
    trendingModelsList.appendChild(modelDiv);
}


 window.onload = function() {
    fetch('http://localhost:3001/api/trendingModels')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for(var d of data) {
                addTrendingModel(document.getElementById('trending-models-list'), d);
            } 
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
            // Handle any errors here
        });
};