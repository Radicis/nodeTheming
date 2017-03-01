var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var config = require('../config/config');
var request = require('request');

router.get('/', function(req, res) {

    // request('http://localhost:3030/object/', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         var context = {};
    //         context.objects = JSON.parse(body);
    //
    //         context.properties = helpers.getKeys(context.objects[0]);

            res.render('default', {});
    //     }
    // });
});

router.get('/setup', function(err, data){
    helpers.createDummyData().then(function(field){
        console.log("Dummy Data created!");
    });
});

module.exports = router;
