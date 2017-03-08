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

    try {

        DisplaySchema.getByCollectionName(config.collectionName, function (err, displaySchema) {
            if (err) {
                res.json(err);
            }

            try {

                var collection = db.collection(displaySchema.collectionName);
                var count = 30000;
                var rand = Math.floor(Math.random() * count);
                collection.find({thumbnail: {$ne: ""}}, {limit: 1}).skip(rand).toArray(function (error, objects) {
                    if (err) {
                        throw err;
                    }

                    var object = objects[0];

                    context.object = {
                        title: object[displaySchema.title],
                        thumbnail: object[displaySchema.thumbnail],
                        url: object[displaySchema.url],
                        date: object[displaySchema.date],
                    };

                    context.title = displaySchema.collectionTitle;

                    res.json(context);
                });
            }
            catch(err){
                res.json(err);
            }
        });
    }
    catch(err){
        res.json(err);
    }
});

router.post('/', function(req, res) {

    try {
        DisplaySchema.getByCollectionName(config.collectionName, function (err, displaySchema) {
            if (err) {
                res.json(err);
            }

            try {

                var count = parseInt(req.body.count);
                var skip = parseInt(req.body.skip);
                var search = req.body.search;

                var collection = db.collection(displaySchema.collectionName);
                collection.find({
                    $and: [{thumbnailUrl: {$ne: null}}, {
                        $or: [{
                            title: {
                                "$regex": search,
                                "$options": "i"
                            }
                        }]
                    }]
                }, {limit: count}).skip(skip).toArray(function (error, dbObjects) {
                    if (err) {
                        throw err;
                    }

                    try {
                        var objects = [];

                        dbObjects.forEach(function (dbObject) {

                            var object = {
                                _id: dbObject._id,
                                title: dbObject[displaySchema.title],
                                thumbnail: dbObject[displaySchema.thumbnail],
                                url: dbObject[displaySchema.url],
                                date: dbObject[displaySchema.date]
                            };

                            objects.push(object)

                        });

                        res.json(objects);
                    }
                    catch (err) {
                        res.json({});
                    }
                });
            }
            catch (err){res.json(err)}
        });
    }
    catch(err){
        res.json(err);
    }
});



router.get('/setup', function(err, data){
    helpers.createDummyData().then(function(field){
        console.log("Dummy Data created!");
    });
});

module.exports = router;
