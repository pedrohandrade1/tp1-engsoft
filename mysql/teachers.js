const connect = require("./connection");

//  Retorna informações sobre um teste especifico realizado pelos alunos
/*async function selectTestStats (userId, testId) {
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId} AND test_id = ${testId};`)
}*/

//  Autentifica professor
async function authenticateTeacher (email, password) {
    const conn = await connect();
    return await conn.query(`SELECT email = ${email} AND password = ${password};`) // Obs: retorna user_id
}

//  Retorna as informações pessoais do professor logado
async function selectTeacherPersonalInfo (userId) {
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId};`)
}

//  Cria uma nova prova
async function insertTest (userId, classId, testInfo) {
    const conn = await connect();

    //  Cria o teste e obtem o seu id
    conn.query(`SET @@auto_increment_increment=1;`)
    conn.query(`SET @@auto_increment_offset=1;`)
    conn.query(`ALTER TABLE heroku_65f5ce87b15f505.quiz AUTO_INCREMENT = 1;`)
    conn.query(`INSERT INTO heroku_65f5ce87b15f505.quiz (idClassroom, idEducator)
    VALUES (${classId}, ${userId});`)
    const testId = conn.query(`(SELECT COUNT(*) FROM heroku_65f5ce87b15f505.quiz)`)

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
    conn.query(`SET @@auto_increment_increment=1;`)
    conn.query(`SET @@auto_increment_offset=1;`)
    conn.query(`ALTER TABLE heroku_65f5ce87b15f505.question AUTO_INCREMENT = 1;`)
    return await conn.query(`INSERT INTO heroku_65f5ce87b15f505.question (idQuiz, question, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE, answerExpected)
    VALUES (${testId},${header}, ${a}, ${b}, ${c}, ${d}, ${e}, ${answer});`)
}

module.exports = { authenticateTeacher, selectTeacherPersonalInfo, insertTest };