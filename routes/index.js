var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var config = require('../config/config');
var request = require('request');

router.get('/', function(req, res) {

    request('http://localhost:3030/object/0', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var context = {};
            context.objects = JSON.parse(body);
            try {
                helpers.getImageColours(context.object[0].thumbnail).then(function (colours) {
                    context.colours = colours;
                    res.render('default', context);
                });
            }
            catch (e) {
                console.log("Vibrant Crashed!: " + e);
                res.render('default', context);
            }
        }
    });
});

router.get('/setup', function(err, data){
    helpers.createDummyData().then(function(field){
        console.log("Dummy Data created!");
    });
});

module.exports = router;
