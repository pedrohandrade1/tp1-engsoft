"use strict"
const express = require('express');
const db = require('../mysql/tests')
const utils = require('../utils');

let router = express.Router();

//  Get test data
//  http://localhost:5500/tests/1/
router
    .route("/:testId/")
    .get((req, res) => {
        const testId = req.params.testId;
        db.selectTestInfo(testId).then(
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

module.exports = router;