var Vibrant = require('node-vibrant');
var q = require('q');
var config = require('../config/config');
var DisplaySchema = require('../models/displaySchema');
var CustomField = require('../models/customField');

module.exports.getFullSizeImage = function(thumbnailUrl){
    if(thumbnailUrl === null || typeof thumbnailUrl === "undefined") {
        return thumbnailUrl.slice(0, -5) + "9.jpg";
    }
};

module.exports.truncate = function(string, value){
    console.log("got: " + string + " and value: " + value);
    if(string != null && typeof string != "undefined") {
        truncated = string.substring(0, value);
        if(string.length>=value) truncated += "...";
        return truncated
    }
};

module.exports.getImageColours = function(url){

    var defer = q.defer();

    var imageColours = [];
    var colours = {};

    var vibrant, lightMuted, darkMuted, darkVibrant;

    Vibrant.from(url).getPalette(function (err, swatches) {
        if (err) throw err;
        for (var key in swatches) {
            var swatch = swatches[key];

            if (swatch) {
                var hex = swatch.getHex();
                imageColours.push({hex: hex, key: key});
                console.log(key + " : " + hex);
            }
        }

        for (var i = 0; i < imageColours.length; i++) {
            if (imageColours[i].key === 'Vibrant') {
                vibrant = imageColours[i].hex;
            }
            if (imageColours[i].key === 'LightMuted') {
                lightMuted = imageColours[i].hex;
            }
            if (imageColours[i].key === 'DarkMuted') {
                darkMuted = imageColours[i].hex;
            }
            if (imageColours[i].key === 'DarkVibrant') {
                darkVibrant = imageColours[i].hex;
            }
        }

        colours.vibrant = vibrant;
        colours.lightMuted = lightMuted;
        colours.darkMuted = darkMuted;
        colours.darkVibrant = darkVibrant;

        defer.resolve(colours);
    });

    return defer.promise;
};

module.exports.searchIMDBTitles = function(term){
    var defer = q.defer();
    var request = require('request');
    request.post("http://imdb.wemakesites.net/api/search?q=" + term + "&api_key=" + config.imdb_key, {json:true}, function(err, res, body){
            defer.resolve(body.data.results.titles);
        }
    );
    return defer.promise;
};

module.exports.getMovieById = function(id){
    var defer = q.defer();
    var request = require('request');
    request.post("http://imdb.wemakesites.net/api/" + id + "?api_key=" + config.imdb_key, {json:true}, function(err, res, body){
            defer.resolve(body.data);
        }
    );
    return defer.promise;
};


module.exports.createDummyData = function(){
    var defer = q.defer();

    var schema = {
        Name: "Dummy",
        brandTitle: "Tate Gallery",
        brandUrl: "/img/logo.png",
        collectionName: 'artworks',
        title: "title",
        thumbnail: "thumbnailUrl",
        url: "url",
        date: "dateText",
        fullSize: "thumbnailUrl",
        customFields: [],
        footnote: "creditLine"
    };

    var field1 = {
        ref: "medium",
        label: "Medium"
    };

    var field2 = {
        ref: "all_artists",
        label: "Artist"
    };

    DisplaySchema.add(schema, function(err, schema){
        console.log(schema);
        DisplaySchema.addCustomField(schema._id, field1, function(err, field){
            DisplaySchema.addCustomField(schema._id, field2, function(err, field){
                defer.resolve(field);
            });
        });
    });
    return defer.promise;
};