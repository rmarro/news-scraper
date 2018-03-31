var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Article = new Schema({
    headline: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    saved: {
        type: Boolean,
    },
    comments: 
});

// I think i need to add methods or fields here so that it can be on the saved or unsaved list