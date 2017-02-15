var express = require('express');
var router = express.Router();
var DisplaySchema = require('../models/displaySchema');
var CustomField = require('../models/displaySchema');
var middleware = require('../middleware/helpers');
var config = require('../config/config');

router.get('/', function(req, res) {
        res.render('config', {});
});

module.exports = router;
