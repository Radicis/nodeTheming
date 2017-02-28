var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var config = require('../config/config');
var DisplaySchema = require('../models/displaySchema');
// Connect to MongoDb
var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/random', function(req, res) {

    var context = {};

    DisplaySchema.getByCollectionName(config.collectionName, function(err, displaySchema) {
        if (err) {
            throw err;
        }

        var collection = db.collection(displaySchema.collectionName);
        var count = 30000;
        var rand = Math.floor(Math.random() * count);
        collection.find({thumbnail: {$ne: ""}}, {limit:1}).skip(rand).toArray(function(error, objects) {
            if (err) {
                throw err;
            }

            var object = objects[0];

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

            res.json(context.object);
        });
    });
});

router.get('/:count', function(req, res) {


    DisplaySchema.getByCollectionName(config.collectionName, function(err, displaySchema) {
        if (err) {
            throw err;
        }

        var count = parseInt(req.params.count);

        var collection = db.collection(displaySchema.collectionName);
        collection.find({thumbnail: {$ne: ""}}, {limit:20}).skip(count).toArray(function(error, dbObjects) {
            if (err) {
                throw err;
            }

            var objects = [];

            dbObjects.forEach(function(dbObject){

                var object = {
                    title: dbObject[displaySchema.title],
                    thumbnail: dbObject[displaySchema.thumbnail],
                    url: dbObject[displaySchema.url],
                    date: dbObject[displaySchema.date],
                    customFields: []
                };

                displaySchema.customFields.forEach(function (field) {
                    object.customFields.push({label: field.label, ref: dbObject[field.ref]});
                });

                object.bg = dbObject[displaySchema['thumbnail']];

                objects.push(object)
            });

            res.json(objects);
        });
    });
});

router.get('/setup', function(err, data){
    helpers.createDummyData().then(function(field){
        console.log("Dummy Data created!");
    });
});

module.exports = router;
