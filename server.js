// ***** ISSUES *****
// When get request made at /scrape, need to check if already in db, only add
//ones that aren't, and reload page
// When save article button is clicked, need to make those articles with unsave buttons (handlebars unless???)
// If there are no saved articles or no saved comments, display a message (if handlebars object is empty???)
// Update style and layout so it's slightly less crappy


// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var routes = require("./routes");


// Initialize Express
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// This HAS to go above app.use(routes)!!!!!!! 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(routes);


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App running on ${port}`);
});