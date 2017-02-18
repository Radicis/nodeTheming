var express = require('express');
var router = express.Router();
var DisplaySchema = require('../models/displaySchema');
var CustomField = require('../models/displaySchema');
var middleware = require('../middleware/helpers');
var config = require('../config/config');

router.get('/', function(req, res) {
    var context = {}
    DisplaySchema.getFirst(function(err, schema){
        if(err)
            throw err;
        context.schema = schema[0];
        res.render('config', context);
    });
});

router.post('/',function(req, res){

    var newSchema = {
        collectionName: req.body.collectionName,
        title: req.body.title,
        url: req.body.url,
        thumbnail: req.body.thumbnail,
        fullSize: req.body.fullSize,
        date: req.body.date,
        customFields: []
    };

    var customFields = [];

    Object.keys(req.body).forEach(function (key) {
        if (key.indexOf("field") !== -1) {
            if (key.indexOf("label") && key.indexOf("ref") == -1) {
                customFields.push(
                    {
                        label: req.body[key]
                    }
                );
            }
            else if (key.indexOf("ref") !== -1) {
                customFields[customFields.length - 1].ref = req.body[key];
            }
        }
    });

    // If an ID was passed then update instead of create
    if(req.body._id){
        newSchema._id = req.body._id;
        DisplaySchema.update(newSchema, function(err, schema){
            // customFields.forEach(function (field) {
            //     console.log("Trying to add: " + field.label);
            //     DisplaySchema.addCustomField(schema._id, field, function (err, createdField) {
            //         console.log("Field added: " + createdField.label);
            //     });
            // });
            res.render('config', {schema: schema});
        })
    }
    else {
        DisplaySchema.add(newSchema, function (err, schema) {
            customFields.forEach(function (field) {
                console.log("Trying to add: " + field.label);
                DisplaySchema.addCustomField(schema._id, field, function (err, createdField) {
                    console.log("Field added: " + createdField.label);
                });
            });
            res.render('config', {schema: schema});
        });
    }

});


router.get('/:_id', function(req, res){
    var id = req.params._id;
    var context = {};
    DisplaySchema.getById(id, function(err, schema){
        if(err)
            throw err;
        context.schema = schema;
        res.render('config', context);
    })
});

module.exports = router;
