var mongoose = require('mongoose');

var DisplaySchemaSchema = mongoose.Schema({
    schemaName:{
      type: String
    },
    title: {
        type: String
    },
    thumbnail: {
        type: String
    },
    fullSize: {
        type: String
    },
    url: {
        type: String
    },
    field1: {
        type: String
    },
    field2: {
        type: String
    },
    date: {
        type: String
    }

});

var DisplaySchema = module.exports = mongoose.model('DisplaySchema', DisplaySchemaSchema);

module.exports.getAll = function(callback, limit){
    return DisplaySchema.find().limit(limit).exec(callback);
};

module.exports.getById = function(id, callback){
    console.log("Getting by id");
    DisplaySchema.findOne({_id: id})
        .exec(callback);
};