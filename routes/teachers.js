"use strict"
const express = require('express');
const db = require('../mysql/teachers')

let router = express.Router();

//  Get test statistics
router
    .route("tests/:testId/")
    .get((req, res) => {
        const userId = req.session.user.id;
        const testId = req.params.testId;
        db.selectTestStats(userId, testId);
    })

//  Create new test
router
    .route("tests/new/")
    .post((req, res) => {
        const userId = req.session.user.id;
        const testInfo = req.body;
        db.insertTest(userId, testInfo);
    })
    
module.exports = router;