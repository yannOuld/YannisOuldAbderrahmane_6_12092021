const SauceModel = require('../models/sauce.js');
const fs = require('fs');

//module pour crée une sauce 
exports.createSauce = (req, res, next) => {
    //recuperer le body de la requête et supprimer l'id automatique de mongoDB
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // crée une sauce avec le model mongoose et le body de la requete
    const sauce = new SauceModel({
        ...sauceObject,
        userId: req.reqdata.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    // sauvegarder la sauce
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

//module pour l'affichage de toute les sauces sur l'index
exports.getAllSauces = (req, res, next) => {
    // methode global find 
    SauceModel.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//module pour afficher une sauce en particulier
exports.getOneSauce = (req, res, next) => {
    // recherche d'un produit avec l'id des params 
    SauceModel.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error })
        });
};

//module pour modifier une sauce
exports.modifySauce = (req, res, next) => {
    // modification de l'image si nécessaire
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    // recuperer le modele mongoose et le mettre à jour
    SauceModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce modifiée.' }))
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error })
        });
};


//module pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    //Trouver la sauc et son image dans les fichiers
    SauceModel.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/image/')[1];
            fs.unlink(`images/${filename}`, () => {
                // supprimer la sauce
                sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet suprimmé' }))
                    .catch(error => {
                        console.log(error);
                        res.status(400).json({ error })
                    });
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//modules pour le systeme de like des users
exports.likesDislikes = (req, res, next) => {
    // Trouver le modèle correspondant
    SauceModel.findOne({ _id: req.params.id })
        .then(sauce => {
            // condition suivant les cas 
            switch (req.body.like) {
                case 1:
                    if (!sauce.usersLiked.includes(req.body.userId)) {
                        SauceModel.updateOne({ _id: req.params.id, $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } })
                            .then(() => res.statut(200).json({ message: 'liked' }))
                            .catch(error => res.status(400).json({ error }));
                        sauce.save();
                    }
                    break;
                case -1:
                    if (!sauce.usersDisliked.includes(req.body.userId)) {
                        SauceModel.updateOne({ _id: req.params.id, $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } })
                            .then(() => res.statut(200).json({ message: 'disliked' }))
                            .catch(error => res.status(400).json({ error }));
                        sauce.save();
                    }
                    break;
                case 0:
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        SauceModel.updateOne({ _id: req.params.id, $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                            .then(() => res.statut(200).json({ message: 'unliked' }))
                            .catch(error => res.status(400).json({ error }));
                        sauce.save();
                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        SauceModel.updateOne({ _id: req.params.id, $inc: { dislikes: -1 }, $pull: { usersLiked: req.body.userId } })
                            .then(() => res.statut(200).json({ message: 'unliked' }))
                            .catch(error => res.status(400).json({ error }));
                        sauce.save();
                    }
                    break;
            }
        })
        .catch(error => res.status(500).json({ error }));
};