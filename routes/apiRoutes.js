var db = require("../models");

module.exports = function(app) {
  // Route for getting all Articles from the db
  app.get("/articles/:category/:criteria", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({ category: req.params.category, criteria: req.params.criteria })
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

};
