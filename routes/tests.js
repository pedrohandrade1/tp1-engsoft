"use strict"
const express = require('express');
const db = require('../mysql/tests')

let router = express.Router();

// Get test data
router
    .route("/:testId/")
    .get((req, res) => {
        const userId = req.session.user.id;
        const testId = req.params.testId;
        db.selectTestInfo(userId, testId);
    })

module.exports = router;