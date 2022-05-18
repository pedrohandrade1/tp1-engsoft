"use strict"
const express = require('express');
let router = express.Router();

// Get test data
router
    .route("/:testId")
    .get((req, res) => {
        const testId = req.params.testId;

        res.send(`get with testId = ${testId}`);
    })

module.exports = router;