// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// ******************************************************************************
// npm packages required / dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

// sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// requires models for syncing
var db = require("./models")

// sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// sets handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// serves static files from the css folder
app.use('/assets', express.static(path.join(__dirname + '/public/assets')));

// calls on routes/controllers
var iceCreamController = require('./controllers/ice_cream_controller');
iceCreamController(app, db);

// syncs the sequelize models and then starting the Express app
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});