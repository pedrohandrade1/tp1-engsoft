const connect = require("./connection");

//  Autentifica estudante 
async function authenticateStudent (email, password) {
    const conn = await connect();
    return await conn.query(`SELECT email = ${email} AND password = ${password};`) // Obs: retorna user_id
}

//  Retorna as informações pessoais do estudante logado
async function selectStudentPersonalInfo (userId) {
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId};`)
}

//  Retorna lista dos testes a serem feitos pelo usuario logado
async function selectTestsToDo (userId) {
    const conn = await connect();
    return await conn.query(`SELECT heroku_65f5ce87b15f505.Quiz.id
    FROM(
        SELECT heroku_65f5ce87b15f505.Registration.idClassroom 
        FROM heroku_65f5ce87b15f505.Registration
        WHERE idStudent = ${userId}) AS A
    INNER JOIN heroku_65f5ce87b15f505.Quiz
    ON A.idClassroom = heroku_65f5ce87b15f505.Quiz.idClassroom
    WHERE (
        SELECT count(*)
        FROM heroku_65f5ce87b15f505.Answer
        WHERE heroku_65f5ce87b15f505.Answer.idQuiz = heroku_65f5ce87b15f505.Quiz.id
        AND heroku_65f5ce87b15f505.Answer.idStudent = ${userId})
        <
        (
        SELECT count(*)
        FROM heroku_65f5ce87b15f505.Question
        WHERE heroku_65f5ce87b15f505.Question.idQuiz = heroku_65f5ce87b15f505.Quiz.id);`)
}

//  Retorna lista dos testes feitos pelo usuario logado
async function selectTestsDone (userId) {
    const conn = await connect();
    return await conn.query(`SELECT heroku_65f5ce87b15f505.Quiz.id
    FROM(
        SELECT heroku_65f5ce87b15f505.Registration.idClassroom 
        FROM heroku_65f5ce87b15f505.Registration
        WHERE idStudent = ${userId}) AS A
    INNER JOIN heroku_65f5ce87b15f505.Quiz
    ON A.idClassroom = heroku_65f5ce87b15f505.Quiz.idClassroom
    WHERE (
        SELECT count(*)
        FROM heroku_65f5ce87b15f505.Answer
        WHERE heroku_65f5ce87b15f505.Answer.idQuiz = heroku_65f5ce87b15f505.Quiz.id
        AND heroku_65f5ce87b15f505.Answer.idStudent = ${userId})
        =
        (
        SELECT count(*)
        FROM heroku_65f5ce87b15f505.Question
        WHERE heroku_65f5ce87b15f505.Question.idQuiz = heroku_65f5ce87b15f505.Quiz.id);`)
}

//  Responde uma questão especifica de uma prova
async function answerQuestion (userId, questionId, answer) {
    const conn = await connect();

    //  Verifica se questão já foi respondida 
    const answered = await conn.query(`INSERT user_id = ${userId};`);
    if (!answered) {
        //  Responde a questão
        await conn.query(`INSERT user_id = ${userId};`)
    }
    return;
}

module.exports = { authenticateStudent, selectStudentPersonalInfo, selectTestsToDo, selectTestsDone, answerQuestion };