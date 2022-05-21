"use strict"
const express = require('express');
const db = require('../mysql/teachers')

let router = express.Router();

//  Authenticate teacher
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const { email, password } = req.params;
        const userId = db.authenticateTeacher(email, password);
        req.session.authenticated = true;
        req.session.user = {
            id: userId
        };
    });

// Get the teacher's personal information
router
    .route("/personal/")
    .get((req, res) => {
        const userId = req.session.user.id;
        db.selectTeacherPersonalInfo(userId);
    });

//  Create new test
router
    .route("tests/new/")
    .post((req, res) => {
        const userId = req.session.user.id;
        const testInfo = req.body;
        db.insertTest(userId, testInfo);
    })

module.exports = router;