"use strict"
const express = require('express');
const db = require('../mysql/students');
const utils = require('../mysql/utils');

let router = express.Router();

//  Authenticate student
//  http://localhost:5500/students/auth/gabriel.sales@dcc.ufmg.br/01234567/
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const { email, password } = req.params;
        db.authenticateStudent(email, password).then(
            (reponse) => {
                const userId = utils.getUniqueResponseAttribute(reponse, 'id');
                req.session.authenticated = true;
                req.session.user = {
                    id: userId
                };
                console.log(`Aluno com id = ${userId} foi autentificado com sucesso!`)
                res.send(userId.toString());
                return;
            },
            (error) => {
                console.error(error);
            }
        )
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