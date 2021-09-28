// verifier que l'identifiant du user et de la requete soit la même
module.exports = (req, res, next) => {
    try {
        if (req.reqdata.userId !== req.body.userId) {
            throw `Invalide user ID`;
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: new Error(`Invalid request`)
        });
    }
};