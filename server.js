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

app.get("/scrape", function (req, res) {
    request("https://blog.github.com/", function (error, response, html) {

        var $ = cheerio.load(html);
        var results = [];


        $("div.mb-5").each(function (i, element) {

            // I think the articleModel needs to get used here?
            // create a new articleModel, and then push that to the results, then insert the results
            // var article = new Article

            var title = $(element).children("h1.lh-condensed").text();
            var link = $(element).children("h1.lh-condensed").children().attr("href");

            results.push({
                title, link
            });

            // db.scrapeData.insert(results);
        });
        res.json(results);
    });
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App running on ${port}`);
});