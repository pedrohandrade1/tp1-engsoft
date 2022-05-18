"use strict"
const express = require('express');
let router = express.Router();

// Get student tests to do
router
    .route("/tests/todo/:userId")
    .get((req, res) => {
        const userId = req.params.userId;

        res.send(`get with userId = ${userId}`);
    })

// Get student tests done list
router
    .route("/tests/done/:userId")
    .get((req, res) => {
        const userId = req.params.userId;

        res.send(`get with userId = ${userId}`);
    })

// Get student test done data
router
    .route("/tests/:testId/")
    .get((req, res) => {
        const userId = req.params.userId;

        res.send(`get with userId = ${userId}`);
    })

module.exports = router;