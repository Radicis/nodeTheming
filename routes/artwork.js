var express = require('express');
var router = express.Router();
var Artwork = require('../models/artwork');
var middleware = require('../middleware/helpers');

// Get listing of all timetables
router.get('/', function(req, res) {
    Artwork.getAll(function(err, table){
        if(err){
            console.log(err);
            res.json(err);
        }
        res.json(table);
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
