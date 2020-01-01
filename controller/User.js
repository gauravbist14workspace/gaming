const express = require('express');
const router = express.Router();
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const userService = require('./../service/UserService');

router.use(bodyParser.json({
    limit: '50mb'
}));
router.use(bodyParser.urlencoded({
    extended: true
}));

/** Returns an array of users from DB */
router.get('/users', function (req, res, next) {

    var userObjects = req.body;
    userService
    res.send(userObjects);
});

/**
 * Excepts an array of users and store them into DB
 */
router.post('/users', function (req, res, next) {

});

/**
 * Edit an user details
 */
router.put('/users', function (req, res, next) {

});

/**
 * Removes users from DB
 */
router.delete('/users', function (req, res, next) {

});



module.exports = router;