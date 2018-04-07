var router = require("express").Router();
var apiRouter = require("./apiRoutes");
var htmlRouter = require("./htmlRoutes");

router.use("/articles", apiRouter);
router.use("/", htmlRouter);

module.exports = router;