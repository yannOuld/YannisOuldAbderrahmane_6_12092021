const mongoose = require('mongoose');
require('dotenv/config');


// authentification à la base de données !!!  les identifiant sont sur un fichier secret  connecté vous a votre propre base de donnée mongoDB Atlas !!!
mongoose.connect(process.env.MONGO_ACCES,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))