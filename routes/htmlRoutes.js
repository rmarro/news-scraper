var router = require("express").Router();
var db = require("../models");


// Route for getting all Articles from the db
router.get("/", function (req, res) {
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
router.get("/saved", function(req, res) {
    db.Article.find({ saved: true})
    .then(function(dbArticle) {
        res.render("saved", {article: dbArticle});
    })
    .catch(function (err) {
        res.json(err);
    });
});

// Route for getting article by id and populating all notes
router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})
    .populate("notes")
    .then(function(dbArticle) {
        res.render("article", {note: dbArticle.notes, article: dbArticle})
    })
    .catch(function(err) {
        res.json(err);
    });
});


module.exports = router;