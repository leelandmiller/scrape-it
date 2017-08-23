const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

mongoose.Promise = Promise;

// Initialize express
let app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(methodOverride("_method"));

app.use(express.static('public'));
app.use('bootstrap', express.static(__dirname + "/node_modules/"))

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


mongoose.connect('mongodb://localhost/mongooseWebScraperDB');
let db = mongoose.connection;

// Show any mongoose errors
db.on("error", err => console.log(`Mongoose Error: ${err}`) );

// Once logged in to the db through mongoose, log a success message
db.once("open", () => console.log('Mongoose connection successful') );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running: localhost:${PORT}`));
