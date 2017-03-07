var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var config = require('../config/config');
var request = require('request');

router.get('/', function(req, res) {

    request('http://localhost:3030/object/random', function (error, response, body) {
         if (!error && response.statusCode == 200) {
             var context = {};

             var object = JSON.parse(body);

             context.properties = helpers.getKeys(object);

             console.log(context.properties);

            res.render('default', context);
         }
    });
});

router.get('/setup', function(err, data){
    helpers.createDummyData().then(function(field){
        console.log("Dummy Data created!");
    });
});

module.exports = router;
