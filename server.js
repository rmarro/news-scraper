// ***** ISSUES *****
// When scrape button is clicked, page does not reload with new results
// When get request made at /scrape, need to check if already in db



// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


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
    res.send("Scrape Complete");
});

// Route for getting all Articles from the db
app.get("/", function (req, res) {
    db.Article.find({})
    .then(function (dbArticle) {
        res.render("index", { article: dbArticle});
    })
    .catch(function (err) {
        console.log(err);
        res.json(err);
    });
});

// Route for getting Articles marked as saved from db
app.get("/saved", function(req, res) {
    db.Article.find({ saved: true})
    .then(function(dbArticle) {
        res.render("saved", {article: dbArticle});
    })
    .catch(function (err) {
        res.json(err);
    });
});

// Route for creating a note and associating it with an article
app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        // If a Note was created successfully, find one Article and push the new Note's _id to the Article's `notes` array
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id }}, {new: true});
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Route for getting article by id and populating all notes
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})
    .populate("notes")
    .then(function(dbArticle) {
        res.json(dbArticle.notes)        
        // res.render("partials/modal", { note: dbArticle.notes});
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Route for changing article to saved
app.post("/articles/save/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }, {new: true})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});



// Route for updating article to unsaved
app.post("/articles/unsave/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false }, {new: true})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});


// delete route for removing a comment from article (is this also put route to update article commment array to remove that??)




var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App running on ${port}`);
});