"use strict"
const express = require('express');
const db = require('../mysql/students')

let router = express.Router();

//  Authenticate student
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const { email, password } = req.params;
        const userId = db.authenticateStudent(email, password);
        req.session.authenticated = true;
        req.session.user = {
            id: userId
        };
    });

// Get the student's personal information
router
    .route("/personal/")
    .get((req, res) => {
        const userId = req.session.user.id;
        db.selectStudentPersonalInfo(userId);
    });

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
/*router
    .route("/tests/:testId/")
    .get((req, res) => {
        const userId = req.session.user.id;
        db.selectTestDoneInfo(userId);
    })*/

router
    .route("/answer/:questionId/:answer")
    .post((req, res) => {
        const { questionId, answer } = req.params;
        const userId = req.session.user.id;
        db.answerQuestion(userId, questionId, answer);
    });

module.exports = router;