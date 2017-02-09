var mongoose = require('mongoose');
var Module = require('../models/module');

var PageSchema = mongoose.Schema({
    title: {
        type: String
    },
    modules: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Module'
    }]
});

var Page = module.exports = mongoose.model('Page', PageSchema);

module.exports.getAll = function(callback, limit){
    Page.find().limit(limit).populate('modules').exec(callback);
};

module.exports.getById = function(id, callback){
    console.log("Getting page by id");
    Page.findOne({_id: id}).populate('modules').exec(callback);
};

module.exports.add = function(page, callback){
    Page.create(page, callback);
};


module.exports.addModule = function(pageId, module, callback){
    console.log('Adding module to page..');
    Page.findByIdAndUpdate(pageId,{$addToSet: {"modules": module}}, callback);
};

module.exports.update = function(page, callback){
    Page.findOneAndUpdate({_id:page._id}, {title:page.title}, { new: true }, callback);
};

module.exports.delete = function(id, callback){
    Page.remove({_id: id}, callback);
};


