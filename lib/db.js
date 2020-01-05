const mongoose = require('mongoose');

var lib = {
    init: () => {
        return new Promise((resolve, reject) => {
            mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
            mongoose.connection.on('error', err => reject(`Connection error: ${err}`));
            mongoose.connection.once('open', () => {
                console.log('Mongo initialization complete.');
                resolve();
            });
        });
    }
}

module.exports = lib;