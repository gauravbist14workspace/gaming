const userData = require('../model/user');

var UserService = function () {
    this.uuid = require('node-uuid');
    this.crypto = require('crypto');
    this.apiMessage = require('../model/api-messages');
    this.apiResponse = require('../model/api-response');
};

userService.prototype.register = function (newUser, cb) {
    var that = this;

    userData.findOne({ email: newUser.email }, function (err, user) {

        if (err) {
            return cb(err, new that.apiResponse({ success: false, extras: { msg: new that.apiMessage().DB_ERROR } }));
        }

        if (user) {
            return cb(err, new that.apiResponse({ success: false, extras: { msg: new that.apiMessage().EMAIL_ALREADY_EXISTS } }));
        } else {

            new userData(newUser)
        }
    });
}

userService.prototype.hashPassword = function (password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default 
    var iterations = 10000,
        keyLen = 64; // 64 bit.
    this.crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};

module.exports = UserService;