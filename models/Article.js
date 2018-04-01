var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        // Trying to avoid pushing articles that already exist when scraping. But what will happen if it tries to add a bunch and some already exist? will only the missing ones get added, or will the whole thing result in an error??
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
    },
    // Figure out how to be able to push multiple notes to the array
    notes: []
    // This is to just associate one with the article:
    // note: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Note"
    //   }

});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
