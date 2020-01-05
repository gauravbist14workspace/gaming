const GamerData = require('../model/gamer');

var gamerService = {
    getGamer: function () {
        return GamerData.find();                 // this is returning a promise
    },
    addGamer: function (gamerData) {
        var data = new GamerData(gamerData);
        return data.save();
    },
    updateGamer: function (gamerData, id) {

        GamerData.findById(id, function (err, doc) {

            if (err) {
                console.log(err);
            }

            doc.username = gamerData.username;
            doc.save();
        });
    },
    deleteGamer: function (id) {
        GamerData.findByIdAndDelete(id).exec();
    }
}

module.exports = gamerService;