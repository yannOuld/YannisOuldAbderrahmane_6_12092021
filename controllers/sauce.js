const Sauce = require('../models/sauce.js');
const fs = require('fs');

//module pour crée une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.reqdata.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
    });

    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        });
};

//module pour l'affichage de toute les sauces sur l'index
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//module pour afficher une sauce en particulier
exports.getOneSauce = (req, res, next) => {
    console.log(req.body.sauce);
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

//module pour modifier une sauce
exports.modifySauce = (req, res, next) => {
    // retrouver la sauce selectionnée
    const objectExist = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    //modifier la sauce 
    Sauce.updateOne(
        { _id: req.params.id },
        { ...objectExist, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//module pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    console.log(req.params.id);
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/image/')[1];
            fs.unlink(`images/${filename}`, () => {

                sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet suprimmé' }))
                    .catch(error => {
                        console.log(error);
                        res.status(400).json({ error })
                    });
            });
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        });
};

//modules pour le systeme de like des users
exports.likesDislikes = (req, res, next) => {
    Sauce.findOneAndUpdate({ _id: req.params.id })
        .then(sauce => {
            switch (req.body.likes) {
                case -1:
                    if (req.body.like == -1) {
                        sauce.dislikes++;
                        sauce.usersDisliked.push(req.body.userId);
                        sauce.save().then(() => res.status(200).json({ message: 'User disliked' }));
                    }
                    break;
                case 1:
                    if (req.body.like == 1) {
                        sauce.likes++;
                        sauce.usersLiked.push(req.body.userId);
                        sauce.save();
                    }
                    break;
                case 0:
                    if (req.body.like == 0) {
                        if (sauce.usersLiked.IndexOf(req.body.userId) != -1) {
                            sauce.likes--;
                            sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
                        } else {
                            sauce.dislikes--;
                            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);
                        }
                        sauce.save();
                    }
                    break;
            }
            res.status(200).json({ message: 'like pris en compte' })
        })
        .catch(error => res.status(500).json({ error }))
};