const jwt = require('jsonwebtoken');
const User = require('../models/user');



const createToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 30*24*60*60 // expires in 30 days
    });
    return token;
}

const verifyToken = (req, res, next) => {

    const {authorization} = req.headers;
    if (!authorization) {
        console.log('No auth provided');
        return res.status(401).send('no autorization');
        
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).send('no token');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token');
            return res.status(401).send('Token no valido');
        }
        req.userId = decoded.id;
        next();
    });
}


module.exports = {
    createToken,
    verifyToken
}