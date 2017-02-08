var express = require('express');
var router = express.Router();
var Artist = require('../models/artist');
var Artwork = require('../models/artwork');
var helpers = require('../middleware/helpers');
var Vibrant = require('node-vibrant');
var Color = require('color');

// router.get('/', function(req, res) {
//
//     // Artwork.getRandoms(function(err, artworks) {
//     //     if (err) {
//     //         throw err;
//     //     }
//     //     console.log(artworks);
//     //     console.log("I found: " + artworks.length);
//     //     for(var i=0;i<artworks.length;i++){
//     //         if(artworks[i].thumbnailUrl == "null" || artworks[i].thumbnailUrl == null){
//     //             artworks[i].bg = "/img/no_bg.jpg";
//     //         }
//     //         else{
//     //             artworks[i].bg = artworks[i].thumbnailUrl.slice(0, -5) + "10.jpg";
//     //         }
//     //     }
//     //     res.render('index', {title: "Homepage", artworks: artworks});
//     // });
//
//
//
// });

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

        // var img = new image();
        // img.src = randomArtwork.thumbnailUrl;

        var imageColours = [];

        var vibrant, lightMuted, darkMuted;

        Vibrant.from(randomArtwork.thumbnailUrl).getPalette(function(err, swatches) {
            if (err) throw err;
            for (var key in swatches) {
                var swatch = swatches[key];
                if (swatch) {
                    var hex = swatch.getHex();
                    imageColours.push({hex:hex, key:key});
                }
            }

            for(var i=0;i<imageColours.length;i++){
                if(imageColours[i].key === 'Vibrant') {
                    //var color = Color(imageColours[i].rgb);
                    vibrant = imageColours[i].hex;
                }
                if(imageColours[i].key === 'LightMuted') {
                    //var color = Color(imageColours[i].rgb);
                    lightMuted = imageColours[i].hex;
                }
                if(imageColours[i].key === 'DarkMuted') {
                    //var color = Color(imageColours[i].rgb);
                    darkMuted = imageColours[i].hex;
                }
            }



            if(randomArtwork.contributors.length>0) {
                Artist.getByDbId(randomArtwork.contributors[0].id, function (err, artist) {
                    res.render('index', {title: "Homepage", artwork: randomArtwork, background: bg, artist: artist, vibrant:vibrant, lightMuted:lightMuted, darkMuted:darkMuted});
                });
            }
            else {
                res.render('index', {title: "Homepage", artwork: randomArtwork, background: bg});
            }
        });

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


module.exports = router;
