const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./lib/db');


if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));

// Users API routes
app.use('/persons', require('./controller/gamerController'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
    // res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 5000;

db.init()
    .then(result => {
        console.log('DB connection success')
        app.listen(PORT, () => {
            console.log('The server has started at port ' + PORT);
        });
    }).catch(error => {
        console.log(error);
    });