var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var config = require('./config/config');
var helpers = require('./middleware/helpers');


// Connect to MongoDb
var mongoose = require('mongoose');

mongoose.connect(config.database, function(err) {
    if (err) console.log("Cannot connect to Db");
    console.log('Successfully connected to MongoDB');
});

var app = express();


var exhbs = hbs.create({
    helpers: helpers,
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir:__dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});

app.engine('hbs', exhbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Init static directories
app.use(express.static(path.join(__dirname + '/public')));
app.set('superSecret', config.secret); // secret variable

// Routes
app.use('/', require('./routes/index'));
app.use('/artwork', require('./routes/artwork'));
app.use('/artist', require('./routes/artist'));

module.exports = app;
