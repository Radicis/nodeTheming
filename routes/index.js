var express = require('express');
var router = express.Router();
var Artist = require('../models/artist');
var Artwork = require('../models/artwork');
var helpers = require('../middleware/helpers');


router.get('/', function(req, res) {
    Artwork.getRandom(function(err, randomArtwork) {
        if (err) {
            throw err;
        }
        if(randomArtwork.thumbnailUrl == "null" || randomArtwork.thumbnailUrl == null){
            var bg = "/img/no_bg.jpg";
        }
        else{
            var bg = randomArtwork.thumbnailUrl.slice(0, -5) + "10.jpg";
        }
        res.render('index', {title: "Homepage", artwork: randomArtwork, background:bg});
    });
});


router.get('/:_id', function(req, res) {
    var id = req.params._id;
    Artwork.getById(function(id, randomArtwork) {
        if(randomArtwork.thumbnailUrl == "null" || randomArtwork.thumbnailUrl == null){
            var bg = "/img/no_bg.jpg";
        }
        else{
            var bg = randomArtwork.thumbnailUrl.slice(0, -5) + "10.jpg";
        }
        res.render('index', {title: "Homepage", artwork: randomArtwork, background:bg});
    });
});

router.get('/next/:_id', function(req, res) {
    var id = req.params._id;
    Artwork.getNext(id, function(randomArtwork) {
        console.log(randomArtwork);
        if(randomArtwork.thumbnailUrl == "null" || randomArtwork.thumbnailUrl == null){
            var bg = "/img/no_bg.jpg";
        }
        else{
            var bg = randomArtwork.thumbnailUrl.slice(0, -5) + "10.jpg";
        }
        res.render('index', {title: "Homepage", artwork: randomArtwork, background:bg});
    });
});

router.get('/prev/:_id', function(req, res) {
    var id = req.params._id;
    Artwork.getPrev(id, function(randomArtwork) {
        if(randomArtwork.thumbnailUrl == "null" || randomArtwork.thumbnailUrl == null){
            var bg = "/img/no_bg.jpg";
        }
        else{
            var bg = randomArtwork.thumbnailUrl.slice(0, -5) + "10.jpg";
        }
        res.render('index', {title: "Homepage", artwork: randomArtwork, background:bg});
    });
});

module.exports = router;
