var express = require('express');
var router = express.Router();
var Artist = require('../models/artist');
var Artwork = require('../models/artwork');
var helpers = require('../middleware/helpers');
var Vibrant = require('node-vibrant');
var config = require('../config/config');

router.get('/', function(req, res) {

    var context = config.context;
    context.title = "Homepage";

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

        context.mainContent.modules.push({
            isHomePage: true
        });

        context.mainContent.homepage.artwork = randomArtwork;
        context.mainContent.homepage.background = bg;

        try {
            helpers.getImageColours(randomArtwork.thumbnailUrl).then(function(colours){
                context.colours = colours;
                if (randomArtwork.contributors.length > 0) {
                    Artist.getByDbId(randomArtwork.contributors[0].id, function (err, artist) {
                        context.artist = artist;
                        res.render('default', context);
                    });
                }
                else {
                    res.render('default', context);
                }
            });

        }
        catch(e){
            console.log("Vibrant Crashed!: " + e);
            if (randomArtwork.contributors.length > 0) {
                Artist.getByDbId(randomArtwork.contributors[0].id, function (err, artist) {
                    context.artist = artist;
                    res.render('default', context);
                });
            }
            else {
                res.render('default', context);
            }
        }
    });
});




// router.get('/:_id', function(req, res) {
//     var id = req.params._id;
//     Artwork.getById(function(id, randomArtwork) {
//         if(randomArtwork.thumbnailUrl == "null" || randomArtwork.thumbnailUrl == null){
//             var bg = "/img/no_bg.jpg";
//         }
//         else{
//             var bg = randomArtwork.thumbnailUrl.slice(0, -5) + "10.jpg";
//         }
//         res.render('index', {title: "Homepage", artwork: randomArtwork, background:bg});
//     });
// });


module.exports = router;
