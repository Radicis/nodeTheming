var mongoose = require('mongoose');

var ModuleSchema = mongoose.Schema({
    title: {
        type: String
    },
    html: {
        type: String
    }
});

var Module = module.exports = mongoose.model('Module', ModuleSchema);

module.exports.getAll = function(callback, limit){
    Module.find().limit(limit).exec(callback);
};

module.exports.getById = function(id, callback){
    Module.findOne({_id: id}).exec(callback);
};

module.exports.add = function(module, callback){
    Module.create(module, callback);
};

module.exports.update = function(module, callback){
    Module.findOneAndUpdate({_id:module._id}, {title:module.title, content:module.content}, { new: true }, callback);
};

module.exports.delete = function(id, callback){
    Module.remove({_id: id}, callback);
};


