"use strict"
const express = require('express');
const db = require('../mysql/students');
const utils = require('../utils');

let router = express.Router();

//  Authenticate student
//  http://localhost:5500/students/auth/gabriel.sales@dcc.ufmg.br/01234567/
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const { email, password } = req.params;
        db.authenticateStudent(email, password).then(
            (response) => {
                if (utils.emptyResponse(response)) {
                    console.warn(`Sem alunos com essas credenciais!`);
                    res.status(403);
                    res.send(`Sem alunos com essas credenciais!`);
                    return;
                }
                const userId = utils.getUniqueResponseAttribute(response, 'id');
                req.session.authenticated = true;
                req.session.user = {
                    id: userId
                };
                console.log(`Aluno com id = ${userId} foi autentificado com sucesso!`);
                res.send(userId.toString());
                return;
            },
            (error) => {
                console.error(error);
                return;
            }
        )
    });

//  Get the student's personal information
//  http://localhost:5500/students/personal/
router
    .route("/personal/")
    .get((req, res) => {
        if (!utils.checkAuth(req)) {
            return;
        }

        const userId = req.session.user.id;
        db.selectStudentPersonalInfo(userId).then(
            (response) => {
                const object = utils.getUniqueResponse(response);
                res.send(JSON.stringify(object));
            },
            (error) => {
                console.error(error);
                return;
            }
        );
    });

//  Get student tests to do
//  http://localhost:5500/students/tests/todo/
router
    .route("/tests/todo/")
    .get((req, res) => {
        if (!utils.checkAuth(req)) {
            return;
        }

        const userId = req.session.user.id;
        db.selectTestsToDo(userId).then(
            (response) => {
                const object = utils.getResponse(response);
                res.send(JSON.stringify(object));
            },
            (error) => {
                console.error(error);
                return;
            }
        );
    })

//  Get student tests done list
//  http://localhost:5500/students/tests/done/
router
    .route("/tests/done/")
    .get((req, res) => {
        if (!utils.checkAuth(req)) {
            return;
        }

        const userId = req.session.user.id;
        db.selectTestsDone(userId).then(
            (response) => {
                const object = utils.getResponse(response);
                res.send(JSON.stringify(object));
            },
            (error) => {
                console.error(error);
                return;
            }
        );
    })

router
    .route("/answer/:testId/:questionId/:answer")
    .post((req, res) => {
        if (!utils.checkAuth(req)) {
            return;
        }

        const { testId, questionId, answer } = req.params;
        const userId = req.session.user.id;
        db.answerQuestion(userId, questionId, testId, answer);
        return;
    });

module.exports = router;