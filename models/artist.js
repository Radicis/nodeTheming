var mongoose = require('mongoose');

var ArtistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDay: {
        type: Number,
        default: 1
    },
    endDay: {
        type: Number,
        default: 5
    },
    hiddenDays: {
        type: [Number],
        default: [0,6]
    },
    startHour: {
        type: Number,
        default: 9
    },
    endHour: {
        type: Number,
        default: 18
    },
    created: {
        type:Date,
        default: Date.now
    },
    updated:{
        type: Date
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subscribed:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    active: {
        type: Boolean,
        default: true
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

