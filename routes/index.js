var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var Vibrant = require('node-vibrant');
var config = require('../config/config');

// Connect to MongoDb
var mongoose = require('mongoose');

var db = mongoose.connection;

router.get('/:type', function(req, res) {

    var type = req.params.type;

    var context = config.global;

    context.page = config.homepage;

    var displaySchema = config.displaySchema[type];
    var collection = displaySchema.collection;

    helpers.searchIMDBTitles("Nine").then(function(titles){
        helpers.getMovieById(titles[0].id).then(function(details){
            details.title = titles[0].title;
            console.log(details);
        })
    });

    db.collection(collection).count(function(err, count){
        console.log("I found: " + count);
        if(err){
            console.log(err);
        }
        var rand = Math.floor(Math.random() * count);
        db.collection(collection).findOne(function(error, object) {
            if (error) {
                throw error;
            }

            context.page.mainContent.hero.object = {
                title: object[displaySchema['title']],
                thumbnail: object[displaySchema['thumbnail']],
                url: object[displaySchema['url']],
                date: object[displaySchema['date']],
                field1: {
                    ref: object[displaySchema['field1'].ref],
                    title: object[displaySchema['field1'].title]
                },
                field2: {
                    ref: object[displaySchema['field2'].ref],
                    title: object[displaySchema['field2'].title]
                }
            };

            context.brand = displaySchema.brand;

            console.log(context.brand);

            context.page.mainContent.hero.object.bg = object[displaySchema['thumbnail']];

            try {
                helpers.getImageColours(context.page.mainContent.hero.object.thumbnail).then(function(colours){
                    context.colours = colours;
                    res.render('default', context);
                });
            }
            catch(e){
                console.log("Vibrant Crashed!: " + e);
                res.render('default', context);
            }
        });
    });
});


module.exports = router;
