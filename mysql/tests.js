const connect = require("./connection");

//  Retorna informações sobre um teste especifico
async function selectTestInfo (testId) {
    const conn = await connect();
    return await conn.query(`SELECT * 
    FROM heroku_65f5ce87b15f505.question
    WHERE idQuiz = ${testId};`)
}


module.exports = { selectTestInfo};