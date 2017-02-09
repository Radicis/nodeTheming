var express = require('express');
var router = express.Router();
var Page = require('../models/page')
var Module = require('../models/module');
var middleware = require('../middleware/helpers');


// Get listing of all timetables
router.get('/', function(req, res) {

    var page = {
        title: "Test Page"
    };

    Page.add(page, function(err, page){
        if(err){
            res.render('error', err);
        }
        else {
            var module = {
                title: "Trst module",
                html: "Hello hello"
            };
            Module.add(module, function(err, module){
                console.log(module);
                console.log("##########");
                if(err){
                    console.log(err);
                }
                Page.addModule(page._id, module, function(err, module){
                    if(err){
                        console.log(err);
                    }
                    Page.getAll(function (err, pages) {
                        if (err) {
                            console.log(err);
                            res.render(pages, err);
                        }

                        var context = {};

                        context.pages = pages;

                        console.log(context);

                        res.render('pages', context);
                    });
                })
            })
        }
    })


});

// Get  by unique id
router.get('/:_id', function(req, res){
    Page.getById(req.params._id, function(err, page){
        if(err){
            res.render('error', error);
        }

        console.log(page);

        var context = {};
        context.page = page;

        res.render('page', context);
    });
});

module.exports = router;
