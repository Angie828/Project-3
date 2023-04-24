const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

const UserModel = require('../db/user/user.model');
const { findUserByToken } = require('./middleware');

const userDB = [];

router.get('/', function (request, response) {
    response.send(userDB);
})

router.post('/', async function (request, response) {
    const body = request.body;

    const newUserResponse = await UserModel.createUser(body)

    response.send("Created new user!");
})

router.post('/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const attemptLoginResponse = await UserModel.attemptLogin(username, password);

        if (!attemptLoginResponse) {
            return res.status(401).send(null);
        }

        const token = jwt.sign({ id: attemptLoginResponse._id }, "HUNTERS_PASSWORD")

        res.cookie("token", token);

        return res.send("User logged in successfully")

    } catch (e) {
        console.log(e);
        res.status(500).send(null);
    }
})

router.post('/create', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const createUserResponse = await UserModel.createUser({ username: username, password: password })

    const token = jwt.sign({ id: createUserResponse._id }, "HUNTERS_PASSWORD")

    res.cookie("token", token);

    return res.send("User created successfully")
})

router.get('/isLoggedIn', findUserByToken, async function (req, res) {
    const user = req.user;
    if (!user) {
        return res.send({ username: null });
    }
    return res.send({ username: user.username })
})

router.post('/logOut', async function (req, res) {

    res.cookie('token', '', {
        maxAge: 0,
    })

    res.send(true);
});

router.get('/lookup/:username', async function (req, res) {
    const username = req.params.username;

    const userData = await
        UserModel.findUserByUsername(username);

    return res.send(userData);
})

router.put('/update', findUserByToken, async function (req, res) {
    req.user.bio = req.body.bio;
    await req.user.save();
    return res.send(req.user);
})



module.exports = router