const connect = require("./connection");

//  Autentifica usuario e cria sessão no back-end (passo necessário para que as proximas requisições da API tenham sucesso)
async function authenticateUser (email, password) {
    const conn = await connect();
    return await conn.query(`SELECT email = ${email} AND password = ${password};`) // Obs: retorna user_id
}

//  Retorna as informações pessoais do usuario logado
async function selectPersonalInfo (userId) {
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId};`) 
}

//  Responde uma questão especifica de uma prova
async function answerQuestion (userId, questionId, answer) {
    const conn = await connect();
    return await conn.query(`INSERT user_id = ${userId};`) 
}

module.exports = { authenticateUser, selectPersonalInfo, answerQuestion};