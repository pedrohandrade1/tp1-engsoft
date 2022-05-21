"use strict"
const express = require('express');
const db = require('../mysql/users')

let router = express.Router();

//  Authenticate the user
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const { email, password } = req.params;
        const userId = db.authenticateUser(email, password);
        req.session.authenticated = true;
        req.session.user = {
            id: userId
        };
    });

// Get the user's personal information
router
    .route("/personal/")
    .get((req, res) => {
        const userId = req.session.user.id;
        db.selectPersonalInfo(userId);
    });


module.exports = router;