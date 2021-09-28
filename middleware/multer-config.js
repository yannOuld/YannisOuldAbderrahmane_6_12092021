const multer = require('multer');

//constante MIME dictionnaire 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}
/* Storage  permet à multer de vérifier ou stocké les données
 ,sous quel noms de fichiers en enlevant les espaces et en prenant en 
 compte un timestamp pour la date. Gère aussi le type de fichier utilisé par l'utilisateur 
 */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');