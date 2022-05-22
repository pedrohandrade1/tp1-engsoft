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
            (reponse) => {
                const userId = utils.getUniqueResponseAttribute(reponse, 'id');
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
            }
        )
    });

// Get the teacher's personal information
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
            }
        );
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