var Vibrant = require('node-vibrant');
var q = require('q');

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
