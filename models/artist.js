var mongoose = require('mongoose');

var ArtistSchema = mongoose.Schema({
    fc: {
        type: String,
    },
    id: {
        type: Number,
    }
});

var Artist = module.exports = mongoose.model('Artist', ArtistSchema);

module.exports.getAll = function(callback, limit){
    console.log("Getting all Artist");
    Artist.find().limit(limit).exec(callback);
};

module.exports.getById = function(id, callback){
    console.log("Getting by id");
    Artist.findOne({_id: id}).exec(callback);
};


module.exports.getByDbId = function(id, callback){
    console.log("Getting by db id");
    Artist.findOne({id: id}).exec(callback);
};
