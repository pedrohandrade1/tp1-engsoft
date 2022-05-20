const connect = require("./connection");

//  Retorna informações sobre um teste especifico realizado pelos alunos
/*async function selectTestStats (userId, testId) {
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId} AND test_id = ${testId};`)
}*/

//  Cria uma nova prova
async function insertTest (userId, classId, testInfo) {
    const conn = await connect();

    //  Cria o teste e obtem o seu id
    const testId = conn.query(`INSERT INTO tableName ;`)

    //  Cria cada questão
    for (let i = 0; i < testInfo.length; i++) {
        await insertQuestion(testId, testInfo[i]);
    }

    return;
}

async function insertQuestion (testId, questionInfo) {
    const conn = await connect();
    const { header, options, answer } = questionInfo;
    const [a, b, c, d, e] = options;
    return await conn.query(`INSERT INTO tableName (header, a, b, c, d, e, answer) VALUES (${header}, ${a}, ${b}, ${c}, ${d}, ${e}, ${answer});`)
}

module.exports = { insertTest };