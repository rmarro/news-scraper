// Require all models
var db = require("../models");

var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
bodyParser.urlencoded({ extended: true });

//adding
var mongoose = require("mongoose");
mongoose.Promise = Promise;



module.exports = {

    // Get all articles from github blog
    scrape: function (req, res) {

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
    },
    
    // Update article to saved
    saveArticle: function(req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }, {new: true})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    },
    
    // Update article to unsaved
    unsaveArticle: function(req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false }, {new: true})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    },

    // Creating a note and associating it with an article
    createNote: function(req, res) {
        console.log(req.body);
        db.Note.create(req.body)
        .then(function(dbNote) {
            // If a Note was created successfully, find one Article and push the new Note's _id to the Article's `notes` array
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id }}, {new: true});
        })
        // .then(function(dbArticle) {
        //     res.json(dbArticle);
        // })
        .catch(function(err) {
            res.json(err);
        });
    },
    
    // Delete a note and remove from article
    deleteNote: function(req, res) {
        
        db.Note.findOneAndRemove({_id: req.params.noteid}, function(err) {
            if (err) {
                res.send(err);
            } else {
                db.Article.findOneAndUpdate({_id: req.params.id}, {$pull: {notes: req.params.noteid}})
                .then(function() {
                    res.send("article updated")
                })
                .catch(function(err) {
                    res.json(err)
                })
            }
        })
    }

}