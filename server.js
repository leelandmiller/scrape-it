const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const methodOverride = require('method-override');

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


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use('/jquery', express.static(__dirname + "/node_modules/jquery/dist"));

mongoose.connect('mongodb://heroku_zm5m4hmp:k5akd0fhbbn3k73fgps3iqlggn@ds041841.mlab.com:41841/heroku_zm5m4hmp');
let db = mongoose.connection;

// Show any mongoose errors
db.on("error", err => console.log(`Mongoose Error: ${err}`) );

// Once logged in to the db through mongoose, log a success message
db.once("open", () => console.log('Mongoose connection successful') );

//---- routes ----//
require('./routes/htmlRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running: localhost:${PORT}`));
