// Import the express library, which is used to create the web server
const express = require('express');

// Import the MongoDB connection function from another file
const connectDB = require('./DBconnection');

// Initialize the express application
const app = express();

// Connect to the MongoDB database using the function from DBconnection.js
connectDB();

// Start the server on port 3000 and log a message when it's running
app.listen(3001, () => {
    console.log("Webapp is running on port 3000");
});
