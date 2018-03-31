// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/scrape", function (req, res) {
    request("https://www.theonion.com/", function (error, response, html) {

        var $ = cheerio.load(html);
        var results = [];

        $("h1.entry-title").each(function (i, element) {

            var title = $(element).text();
            var link = $(element).children().attr("href");
            results.push({
                title, link
            });
            db.scrapeData.insert(results);
            res.json(results);
        });
    });
});
