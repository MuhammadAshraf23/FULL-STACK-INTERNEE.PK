const express = require('express');
const mongoose = require('mongoose');  
const router = express.Router();
const UserModel = require('../models/UserSchema');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                UserModel.create(req.body)
                    .then(res => res.json(res))
                    .catch(err => res.json(err));
            }
        });
});

module.exports = router;
