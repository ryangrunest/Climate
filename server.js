require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

const db = require("./models");
// require mongodb_uri
const keys = require('./keys/key.js')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Connect to the Mongo DB
mongoose.connect(keys.mongo_uri, { useNewUrlParser: true }).then(() => {
  console.log('Mongo connected');
});

// Start the server
app.listen(PORT, function() {
  console.log(`The machines are taking over at port ${PORT}`);
});

module.exports = app;