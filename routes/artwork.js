var express = require('express');
var router = express.Router();
var Artwork = require('../models/artwork');
var middleware = require('../middleware/helpers');
var config = require('../config/config');

// Get listing of all timetables
router.get('/', function(req, res) {

    var context = config.global;

    context.page = config.artworks;

    Artwork.getAll(function(err, artworks){
        if(err){
            res.render('error', {error:err});
        }

        context.page.mainContent.modules[0].collection = artworks;


        res.render('default', context);
    });
});

// Get timetable by unique id
router.get('/:_id', function(req, res){
    Artwork.getById(req.params._id, function(err, table){
        if(err){
            res.status(err.status || 404);
        }
        res.json(table);
    });
});

module.exports = router;
