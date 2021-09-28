require('./manager/mongodb.js');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const app = express();
const path = require('path');
const multer = require('multer');



const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');


// headers pour le Cross-Origin Request Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);

app.use('/api/auth', userRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: err.stack,
    });
});

module.exports = app;