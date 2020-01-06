const userData = require('../model/user');

var UserService = function (session) {
    this.uuid = require('node-uuid');
    this.crypto = require('crypto');
    this.apiMessage = require('../model/api-messages');
    this.apiResponse = require('../model/api-response');
    this.userProfileModel = require('../model/user-profile');
    this.session = session;
};

Object.freeze(UserService);

UserService.prototype.getSession = function () {
    return this.session;
};

UserService.prototype.setSession = function (session) {
    this.session = session;
};

UserService.prototype.login = function (email, password, cb) {
    var that = this;

    userData.findOne({ email: email }, function (err, user) {

        if (err) {
            return cb(err, new that.apiResponse({ success: false, extras: { msg: that.apiMessage.DB_ERROR } }));
        }

        if (user) {

            that.hashPassword(password, user.passwordSalt, function (err, passwordHash) {

                if (passwordHash == user.passwordHash) {

                    var userProfileModel = new that.UserProfileModel({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                    that.session.userProfileModel = userProfileModel;

                    return cb(err, new that.apiResponse({
                        success: true, extras: {
                            userProfileModel: userProfileModel
                        }
                    }));
                } else {
                    return cb(err, new that.apiResponse({ success: false, extras: { msg: that.apiMessage.INVALID_PWD } }));
                }
            });

        } else {
            return cb(err, new that.apiResponse({ success: false, extras: { msg: that.apiMessage.EMAIL_NOT_FOUND } }));
        }
    });
}

UserService.prototype.register = function (newUser, cb) {
    var that = this;

    userData.findOne({ email: newUser.email }, function (err, user) {

        if (err) {
            return cb(err, new that.apiResponse({ success: false, extras: { msg: that.apiMessage.DB_ERROR } }));
        }

        if (user) {
            return cb(err, new that.apiResponse({ success: false, extras: { msg: that.apiMessage.EMAIL_ALREADY_EXISTS } }));
        } else {

            new userData(newUser).save(function (err, doc, numberAffected) {
                if (err) {
                    return cb(err, new that.apiResponse({ success: false, extras: { msg: that.apiMessage.DB_ERROR } }));
                }
                if (numberAffected === 1) {
                    var userProfileModel = new that.UserProfileModel({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });
                    return cb(err, new that.apiResponse({
                        success: true, extras: {
                            userProfileModel: userProfileModel
                        }
                    }));
                } else {
                    return cb(err, new that.apiResponse({ success: false, extras: { msg: that.apiMessage.COULD_NOT_CREATE_USER } }));
                }
            });
        }
    });
}

UserService.prototype.hashPassword = function (password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default 
    var iterations = 10000,
        keyLen = 64; // 64 bit.
    this.crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};

module.exports = UserService;