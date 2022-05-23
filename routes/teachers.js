"use strict"
const express = require('express');
const db = require('../mysql/teachers')
const utils = require('../utils');

let router = express.Router();

//  Authenticate teacher
//  http://localhost:5500/teachers/auth/joao.silva@dcc.ufmg.br/00000000/
router
    .route("/auth/:email/:password")
    .get((req, res) => {
        const { email, password } = req.params;
        db.authenticateTeacher(email, password).then(
            (response) => {
                if (utils.emptyResponse(response)) {
                    console.warn(`Sem professores com essas credenciais!`);
                    res.status(403);
                    res.render(`Sem professores com essas credenciais!`);
                    return;
                }

                const userId = utils.getUniqueResponseAttribute(response, 'id');
                req.session.authenticated = true;
                req.session.user = {
                    id: userId
                };
                console.log(`Professor com id = ${userId} foi autentificado com sucesso!`);
                res.send(userId.toString());
                return;
            },
            (error) => {
                console.error(error);
                return;
            }
        )
    });

//  Get the teacher's personal information
//  http://localhost:5500/teachers/personal/
router
    .route("/personal/")
    .get((req, res) => {
        if (!utils.checkAuth(req)) {
            return;
        }

        const userId = req.session.user.id;
        db.selectTeacherPersonalInfo(userId).then(
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

//  Get teacher tests created
//  http://localhost:5500/teachers/tests/created/
router
    .route("/tests/created/")
    .get((req, res) => {
        if (!utils.checkAuth(req)) {
            return;
        }

        const userId = req.session.user.id;
        db.selectTestsCreated(userId).then(
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

//  Create new test
router
    .route("/tests/new/:testInfo")
    .post((req, res) => {
        if (!utils.checkAuth(req)) {
            return;
        }

        const userId = req.session.user.id;
        const testInfo = JSON.parse(req.params.testInfo);
        console.log(testInfo);
        db.insertTest(userId, 1, testInfo).then(
            (response) => {
                console.log("Prova adicionada com sucesso!");
                res.send("Prova adicionada com sucesso!");
            },
            (error) => {
                console.error(error);
                return;
            }
        );
    })

module.exports = router;