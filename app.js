require('./manager/mongodb.js');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const app = express();
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');

const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');

// headers pour le Cross-Origin Request Sharing
app.use(cors());

// helmet ameliore la securité de l'api notamment contre les attaques XSS
app.use(helmet());

// body parser gerer le content type et l'utilisation de middleware
app.use(bodyParser.json());

// transferer les données a dans l'url de maniere securisé
app.use(bodyParser.urlencoded({ extended: true }));

//outil de developpement qui renvoie les requetes dans le terminal
app.use(morgan("dev"));

// routes pour trouver les images incorporés avec multer 
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes utilisés par l'application 
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// midleware de devellopement qui gère les messages d'erreurs 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: err.stack,
    });
});

module.exports = app;