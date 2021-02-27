const jwt = require ('jsonwebtoken');
const config =  require("config");

const TOKEN  = process.env.NODE_ENV === undefined 
    ? config.get("TOKEN") :  process.env.TOKEN;


const createSign = (info) => {
    return jwt.sign(info, TOKEN, {expiresIn: 1440});
}

const autorizeRoute = (req, res, next) => {
    const token = req.headers["access-token"];
    if(token) {
        jwt.verify(token, TOKEN , (error, decoded) => {
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