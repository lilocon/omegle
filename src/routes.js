'use strict';

var express = require('express');
var router = express.Router();
// var storage = require('./storage');
var uid = require('uid-safe').sync;


/**
 * 检测clientId
 */
router.get(/^\/*/, function (req, res, next) {
    var clientId = req.cookies.client_id;
    if (clientId == undefined) {
        clientId = uid(25);
        res.cookie('client_id', clientId);
    }
    req.clientId = clientId;
    next();
});


/* GET home page. */
router.get('/', function (req, res) {
    res.redirect('/room');
});


router.get('/room', function (req, res) {
    // console.log(req.clientId);

    // res.end(req.sessionID);
    res.render('room', {});
});


module.exports = router;
