const connect = require("./connection");

//  Retorna informações sobre um teste especifico realizado pelos alunos
/*async function selectTestStats (userId, testId) {
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId} AND test_id = ${testId};`)
}*/

//  Retorna lista dos testes feitos pelo usuario logado
async function insertTest (userId, testInfo) {
    const { header, options, answer } = testInfo;
    const [a, b, c, d] = options;
    const conn = await connect();
    return await conn.query(`INSERT INTO tableName (header, a, b, c, d, answer) VALUES (${header}, ${a}, ${b}, ${c}, ${d}, ${answer});`)
}


module.exports = { insertTest };