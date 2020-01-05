const mongoose = require('mongoose');

const gamerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: String,
        unique: false,
        required: true,
        default: Date.now
    }
});

const GamerData = mongoose.model('GamerDetail1', gamerSchema);
module.exports = GamerData;