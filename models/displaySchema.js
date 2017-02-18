var mongoose = require('mongoose');
var CustomField = require('../models/customField');

var DisplaySchemaSchema = mongoose.Schema({
    schemaName:{
      type: String
    },
    collectionName: {
        type: String
    },
    brandTitle: {
        type: String
    },
    brandUrl: {
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
    customFields:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomField',
        required: false
    }],
    footnote: {
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

module.exports.getFirst = function(callback){
    return DisplaySchema.find().limit(1).populate('customFields').exec(callback);
};

module.exports.getByCollectionName = function(collectionName, callback){
    console.log("Getting by collection name: " + collectionName);
    DisplaySchema.findOne({collectionName: collectionName}).populate('customFields').exec(callback);
};

module.exports.add = function(schema, callback){
    console.log('Creating new schema..');
    DisplaySchema.create(schema, callback);
};

module.exports.update = function(schema, callback){
    console.log("Updating details id: " + schema._id);
    DisplaySchema.findOneAndUpdate({_id:schema._id}, {title:schema.title, collectionName: schema.collectionName, url: schema.url, thumbnail: schema.thumbnail, fullSize: schema.fullSize, date: schema.date, customFields:schema.customFields}, { new: false }, callback);
};

module.exports.addCustomField = function(id, field, callback){
    CustomField.add(field, function(err, field){
        DisplaySchema.findByIdAndUpdate(id,{$addToSet: {"customFields": field}}, callback);
    });
};
