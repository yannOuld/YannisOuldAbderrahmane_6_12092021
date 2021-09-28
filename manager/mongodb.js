const mongoose = require('mongoose');
const authConfig = require('../configs/auth.config.js');

// authentification à la base de données !!!  les identifiant sont sur un fichier secret  connecté vous a votre propre base de donnée mongoDB Atlas !!!
mongoose.connect(`mongodb+srv://${authConfig.name}:${authConfig.password}@${authConfig.cluster}/${authConfig.database}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))