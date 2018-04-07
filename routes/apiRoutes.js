var router = require("express").Router();
var controller = require("../controllers/controller.js");


router.get("/scrape", controller.scrape);

router.post("/save/:id", controller.saveArticle);

router.post("/unsave/:id", controller.unsaveArticle);

router.post("/:id", controller.createNote);

router.delete("/:id/:noteid", controller.deleteNote);

module.exports = router;