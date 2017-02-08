var mongoose = require('mongoose');

var ArtworkSchema = mongoose.Schema({
    acquisitionYear: {
        type: Number
    },
    all_artists: {
        type: String
    },
    classification: {
        type: String
    },
    contributorCount: {
        type: Number
    },
    contributors: {
        type: Object
    },
    creditLine: {
        type: String
    },
    dateText: {
        type: String
    },
    dimensions: {
        type: String
    },
    medium: {
        type: String
    },
    thumbnailUrl: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String
    }
});

var Artwork = module.exports = mongoose.model('Artwork', ArtworkSchema);

module.exports.getAll = function(callback, limit){
    console.log("Getting all artworks");
    return Artwork.find()
                .limit(limit).exec(callback);
};

module.exports.getById = function(id, callback){
    console.log("Getting by id");
    Artwork.findOne({_id: id})
        .exec(callback);
};

module.exports.getRandom = function(callback){
    console.log("Getting random");
    Artwork.count(function(err, count){
        if(err){

        }
        var rand = Math.floor(Math.random() * count);
        Artwork.findOne().skip(rand).exec(callback);
    });

};

module.exports.getNext = function(id, callback){
    console.log("Getting next for id: " + id);
    Artwork.find({_id: {$gt: id}}).limit(1).exec(callback);
};


module.exports.getPrev = function(id, callback){
    console.log("Getting previous");
    Artwork.find({_id: {"$lt": id}}).limit(1).exec(callback);
};