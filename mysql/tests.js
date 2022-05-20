const connect = require("./connection");

//  Retorna informações sobre um teste especifico
async function selectTestInfo (userId, testId) {
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId} AND test_id = ${testId};`)
}


module.exports = { selectTestInfo};