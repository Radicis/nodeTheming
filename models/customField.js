var mongoose = require('mongoose');

var CustomFieldSchema = mongoose.Schema({
    label: {
        type: String
    },
    ref: {
        type: String
    }
});

var CustomField = module.exports = mongoose.model('CustomField', CustomFieldSchema);

module.exports.getAll = function(callback, limit){
    return CustomField.find().limit(limit).exec(callback);
};

module.exports.getById = function(id, callback){
    console.log("Getting by id");
    CustomField.findOne({_id: id})
        .exec(callback);
};

module.exports.add = function(field, callback){
    console.log("Creating new field: " + field.label);
    CustomField.create(field, callback);
};
