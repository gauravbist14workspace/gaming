const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    passwordHash: String,
    passwordSalt: String
});

const UserData = mongoose.model('User1', userSchema);
module.exports = UserData;