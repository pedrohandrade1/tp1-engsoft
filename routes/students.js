"use strict"
const express = require('express');
const db = require('../mysql/students')

let router = express.Router();

// Get student tests to do
router
    .route("/tests/todo/")
    .get((req, res) => {
        const userId = req.session.user.id;
        db.selectTestsToDo(userId);
    })

// Get student tests done list
router
    .route("/tests/done/")
    .get((req, res) => {
        const userId = req.session.user.id;
        db.selectTestsDone(userId);
    })

// Get student test done data
router
    .route("/tests/:testId/")
    .get((req, res) => {
        const userId = req.session.user.id;
        db.selectTestDoneInfo(userId);
    })

module.exports = router;