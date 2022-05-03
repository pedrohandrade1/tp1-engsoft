"use strict"
const express = require('express');
let router = express.Router();

//  Authenticates the user
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const email = req.params.email;
        const password = req.params.password;

        res.send(`get with email = ${email} and password = ${password}`);
    })
    .post((req, res) => {
        const email = req.params.email;
        const password = req.params.password;

        res.send(`post with email = ${email} and password = ${password}`);
    });

// Gets the user's personal information
router
    .route("/personal/:userId")
    .get((req, res) => {
        const userId = req.params.userId;

        res.send(`get with userId = ${userId}`);
    });

// Gets user tests
router
    .route("/tests/:userId")
    .get((req, res) => {
        const userId = req.params.userId;

        res.send(`get with userId = ${userId}`);
    })

module.exports = router;