const UserModel = require('../db/user/user.model');
const jwt = require('jsonwebtoken');

async function findUserByToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.send({ username: null })
    }
    let decryptedToken;
    try {
        decryptedToken = jwt.verify(token, "HUNTERS_PASSWORD")
    } catch (e) {
        return res.send({ username: null })
    }

    if (!decryptedToken) {
        return res.send({ username: null })
    } else {
        const user = await UserModel.findUserById(decryptedToken.id)
        req.user = user;
        next();
    }
}

module.exports = {
    findUserByToken
}