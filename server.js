// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");

// Initialize Express
var app = express();

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`App running on ${port}`);
});