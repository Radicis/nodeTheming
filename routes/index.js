var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var config = require('../config/config');
var DisplaySchema = require('../models/displaySchema');
// Connect to MongoDb
var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/', function(req, res) {

    var collection = config.collectionName;

    var context = {};

    DisplaySchema.getByCollectionName(collection, function(err, displaySchema) {

        console.log(displaySchema);

        db.collection(displaySchema.collectionName).findOne(function(error, object) {
            if (err) {
                throw err;
            }

            context.object = {
                title: object[displaySchema.title],
                thumbnail: object[displaySchema.thumbnail],
                url: object[displaySchema.url],
                date: object[displaySchema.date],
                customFields: []
            };

            displaySchema.customFields.forEach(function (field) {
                context.object.customFields.push({label: field.label, ref: object[field.ref]});
            });

            context.object.bg = object[displaySchema['thumbnail']];

            try {
                helpers.getImageColours(context.object.thumbnail).then(function (colours) {
                    context.colours = colours;
                    res.render('default', context);
                });
            }
            catch (e) {
                console.log("Vibrant Crashed!: " + e);
                res.render('default', context);
            }
        });
    });
});

router.get('/setup', function(err, data){
    helpers.createDummyData().then(function(field){
        console.log("Dummy Data created!");
    });
});

module.exports = router;
