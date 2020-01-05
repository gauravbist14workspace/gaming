const express = require('express');
const router = express.Router();
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const gamerService = require('./../service/gamerService');

router.use(bodyParser.json({
    limit: '50mb'
}));
router.use(bodyParser.urlencoded({
    extended: true
}));

/** Returns an array of users from DB */
router.get('/gamers', function (req, res, next) {

    gamerService.getGamer().then(doc => {
        console.log(`Retreived from DB: ${doc}`);
        res.send(doc);
    });

});

/**
 * Excepts an array of gamers and store them into DB
 */
router.post('/gamers', function (req, res, next) {
    var user = {
        username: req.body.username
    }
    
    gamerService.addGamer().then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err.errmsg);
    });

});

/**
 * Edit an gamer details
 */
router.put('/gamers', function (req, res, next) {

});

/**
 * Removes gamers from DB
 */
router.delete('/gamers', function (req, res, next) {

});


/** Reshuffles list of gamers */
router.get('/shuffle', function (req, res, next) {

    userService.getGamer().then(doc => {
        var newArr = shuffle(doc);
        res.send(newArr);
    });
});

function shuffle(arr) {
    var currentIndex = arr.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

module.exports = router;