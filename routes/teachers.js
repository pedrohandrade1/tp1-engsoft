"use strict"
const express = require('express');
let router = express.Router();

// Get test statistics
router
    .route("tests/:testId")
    .get((req, res) => {
        const testId = req.params.testId;

        res.send(`get with testId = ${testId}`);
    })

router
    .route("/new/")
    .post((req, res) => {
        const header = req.body.header;
        const options = req.body.options;
        const answer = req.body.answer;

        res.send(`get question: \n${header}\n${options}\n${answer}`);
    })
module.exports = router;