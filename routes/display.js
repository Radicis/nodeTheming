var express = require('express');
var router = express.Router();
var DisplaySchema = require('../models/displaySchema');
var middleware = require('../middleware/helpers');
var config = require('../config/config');

// Get listing of all timetables
router.get('/', function(req, res) {

    var context = config.global;

    var displayFields = config.artworkDisplay;

    context.object = {
        title: displayFields['title'],
        thumbnail: displayFields['thumbnail'],
        url: displayFields['url']
    };

    context.page = config.artworks;

    Artwork.getAll(function(err, objects){
        if(err){
            res.render('error', {error:err});
        }

        context.page.mainContent.modules[0].collection = objects;


        res.render('default', context);
    });
});

// Get timetable by unique id
router.get('/:_id', function(req, res){
    Display.getById(req.params._id, function(err, object){
        if(err){
            res.status(err.status || 404);
        }
        res.json(object);
    });
});

module.exports = router;
