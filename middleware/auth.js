const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        console.log(header);
        const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
        req.reqdata = decodedToken;
        if (req.body.userId && req.body.userId !== req.reqdata.userId) {
            throw ' Invalid user ID';
        } else {

            next();
        }
    }
    catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}