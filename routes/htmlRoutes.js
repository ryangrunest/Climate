var db = require("../models");

module.exports = function(app) {

  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });
  // Load city page
  app.get("/:city", function(req, res) {
    let city = req.params.city;
    res.render("city", { city: city, message: 'Hello there!' });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
