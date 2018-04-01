// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.send("Hello world");
});

// Scrape route (get all articles from github blog)
app.get("/scrape", function (req, res) {

    // Get the body of the html with request
    request("https://blog.github.com/", function (error, response, html) {

        var $ = cheerio.load(html);

        $("div.mb-5").each(function (i, element) {
            // Add the title, link, and summary to a new result object
            var result = {};
            result.title = $(element).children("h1.lh-condensed").text().trim();
            result.link = "https://blog.github.com" + $(element).children("h1.lh-condensed").children().attr("href");
            result.summary = $(element).children("div.content").children("p").text().split(".", 1).toString();
            result.saved = false;

            // Create a new Article with the result object made above
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
    });
    res.send("Scrape Complete")
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App running on ${port}`);
});