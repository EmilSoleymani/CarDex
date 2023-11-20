/**
 * This is the server-side code for the backend of the CarDex application.
 * 
 * Endpoints:
 * - POST at endpoint /api/addSearch
 *    - Adds a search to the search history of a model
 * - GET at endpoint /api/trendingModels
 *    - Returns a list of the top 3 trending models
 * - GET at endpoint /api/manufacturers
 *    - Returns a list of all manufacturers
 * 
 * Author: Emil Soleymani
 * Last Modification: 2023-11-20
 */
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to handle the request of adding a search history
app.post('/api/addSearch', (req, res) => {
    const searchQuery = req.body.search;
    console.log('\nSearch query received:', searchQuery);
    // Handle the search query...
    console.log('Adding search to history...');
    const data = require('./public/data/api.json');
    
    // Find all entries in data.data where searchQuery matches entry.make + ' ' + entry.model and add the current datetime to the entry.search_history array
    data.data.filter(entry => {
        return entry.year + ' ' + entry.make + ' ' + entry.model === searchQuery;
    }).forEach(entry => {
        entry.search_history.push(new Date().toISOString());
    });
    
    // Write the updated data back to the file
    fs.writeFileSync('./public/data/api.json', JSON.stringify(data, null, 2));

    var updatedData = data.data.filter(entry => {
      return entry.year + ' ' + entry.make + ' ' + entry.model === searchQuery;
    })

    console.log('Search history updated:', updatedData);

    // Send a response to the client
    if (updatedData.length > 0) {
      res.status(201).send('Search history added successfully');
    } else {
      res.status(200).send('Nothing updated')
    }
});

// GET at endpoint /api/trendingModels reads the data at public/data/api.json under entry "data" and sorts by length of search_history field in each entry
app.get('/api/trendingModels', async (req, res) => {
  try {
    const data = require('./public/data/api.json');

    // For each entry in data.data, delete all entries in search_history that represent a Date().toISOString() older than 30 days
    const thirtyDaysAgo = new Date();  
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);  // Get the date 30 days ago

    // Filter out search_history entries older than 30 days
    data.data.forEach(entry => {
        entry.search_history = entry.search_history.filter(dateStr => {
            const searchDate = new Date(dateStr);
            return searchDate > thirtyDaysAgo;
        });
    });

    // Write the updated data back to the file
    fs.writeFileSync('./public/data/api.json', JSON.stringify(data, null, 2));

    var sortedData = data.data.sort((a, b) => {
      // First sort: by make and model alphabetically
      const makeModelA = a.make.toLowerCase() + ' ' + a.model.toLowerCase();
      const makeModelB = b.make.toLowerCase() + ' ' + b.model.toLowerCase();
      return makeModelA.localeCompare(makeModelB);
    });

    sortedData = sortedData.sort((a, b) => {
      // Second sort: by length of search history
      return b.search_history.length - a.search_history.length;
    });

    const trendingModels = sortedData.slice(0, 3);

    // Send the filtered data as a response
    res.json(trendingModels);
  } catch (error) {
    // Handle possible errors
    console.error('Error reading the JSON file:', error);
    res.status(500).send('An error occurred while retrieving the trending models');
  }
});

// GET at endpoint /api/manufacturers reads the data at public/data/api.json under entry "data" and returns a list of all unique manufacturers
app.get('/api/manufacturers', async (req, res) => {
  try {
    const data = require('./public/data/api.json');

    // Get a list of all unique manufacturers
    const manufacturers = [...new Set(data.data.map(entry => entry.make))];

    // Sort the list alphabetically
    manufacturers.sort();

    // Send the list of manufacturers as a response
    res.json(manufacturers);
  } catch (error) {
    // Handle possible errors
    console.error('Error reading the JSON file:', error);
    res.status(500).send('An error occurred while retrieving the manufacturers');
  }
});
