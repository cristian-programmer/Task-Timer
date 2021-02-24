const jwt = require ('jsonwebtoken');

const createSign = (info) => {
    return jwt.sign(info, process.env.TOKEN, {expiresIn: 1440});
}

const autorizeRoute = (req, res, next) => {
    const token = req.headers["access-token"];
    if(token) {
        jwt.verify(token, process.env.TOKEN, (error, decoded) => {
            if(error) {
                res.sendStatus(403); 
            }else {
                req.decoded = decoded;
                next();
            };
        });
    }else {
        res.sendStatus(403);
    }
}

module.exports = {
    createSign,
    autorizeRoute
}