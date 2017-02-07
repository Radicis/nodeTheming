var express = require('express');
var router = express.Router();
var Art = require('../models/art');
var middleware = require('../middleware/helpers');


// Get listing of all timetables
router.get('/', function(req, res) {
    Art.getAll(function(err, table){
        if(err){
            console.log(err);
            res.json(err);
        }
        res.json(table);
    });
});

// Get timetable by unique id
router.get('/:_id', function(req, res){
    Art.getById(req.params._id, function(err, table){
        if(err){
            res.status(err.status || 404);
        }
        res.json(table);
    });
});


router.all("/*", middleware.validToken, function(req, res, next) {
    next(); // if the middleware allowed us to get here,
            // just move on to the next route handler
});

module.exports = router;
