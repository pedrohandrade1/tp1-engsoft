"use strict"
const express = require('express');
let router = express.Router();

//  Authenticate the user
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const { email, password } = req.params;
        if (email && password) {
            console.log(req.session)
            if (req.session.authenticated) {
                console.log("authentificado")
            } else {
                req.session.authenticated = true;
                req.session.user = {
                    id: "45"
                };
            }
            res.send(`get with email = ${email} and password = ${password}`);
        } else {
            console.log("sem senha e email")
        }
    })
    .post((req, res) => {
        const email = req.params.email;
        const password = req.params.password;

        res.send(`post with email = ${email} and password = ${password}`);
    });

// Get the user's personal information
router
    .route("/personal/:userId")
    .get((req, res) => {
        const userId = req.params.userId;

        res.send(`get with userId = ${userId}`);
    });

module.exports = router;