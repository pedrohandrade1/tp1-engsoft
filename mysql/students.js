const connect = require("./connection");
const utils = require("../utils");

//  Autentifica estudante 
async function authenticateStudent (email, password) {
    const conn = await connect();
    const result = await conn.query(`SELECT DISTINCT heroku_65f5ce87b15f505.student.id
    FROM heroku_65f5ce87b15f505.student 
    WHERE heroku_65f5ce87b15f505.student.email = "${email}" AND heroku_65f5ce87b15f505.student.password = "${password}";`) // Obs: retorna user_id
    conn.end();
    return result;
}

//  Retorna as informações pessoais do estudante logado
async function selectStudentPersonalInfo (userId) {
    const conn = await connect();
    const result = await conn.query(`SELECT DISTINCT heroku_65f5ce87b15f505.student.id, heroku_65f5ce87b15f505.student.firstName, heroku_65f5ce87b15f505.student.lastName, heroku_65f5ce87b15f505.student.email
    FROM heroku_65f5ce87b15f505.student 
    WHERE heroku_65f5ce87b15f505.student.id = ${userId};`)
    conn.end();
    return result;
}

//  Retorna lista dos testes a serem feitos pelo usuario logado
async function selectTestsToDo (userId) {
    const conn = await connect();
    const result = await conn.query(`SELECT B.id, heroku_65f5ce87b15f505.educator.firstName, heroku_65f5ce87b15f505.educator.lastName
    FROM ( 
        SELECT heroku_65f5ce87b15f505.Quiz.id, heroku_65f5ce87b15f505.Quiz.idEducator 
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
                WHERE heroku_65f5ce87b15f505.Question.idQuiz = heroku_65f5ce87b15f505.Quiz.id)) AS B
    INNER JOIN heroku_65f5ce87b15f505.educator
    ON B.idEducator = heroku_65f5ce87b15f505.educator.id;`);
    conn.end();
    return result;
}

//  Retorna lista dos testes feitos pelo usuario logado
async function selectTestsDone (userId) {
    const conn = await connect();
    const result = await conn.query(`SELECT B.id, heroku_65f5ce87b15f505.educator.firstName, heroku_65f5ce87b15f505.educator.lastName
    FROM ( 
        SELECT heroku_65f5ce87b15f505.Quiz.id, heroku_65f5ce87b15f505.Quiz.idEducator 
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
                WHERE heroku_65f5ce87b15f505.Question.idQuiz = heroku_65f5ce87b15f505.Quiz.id)) AS B
    INNER JOIN heroku_65f5ce87b15f505.educator
    ON B.idEducator = heroku_65f5ce87b15f505.educator.id;`);
    conn.end();
    return result;
}

//  Responde uma questão especifica de uma prova
async function answerQuestion (userId, questionId, quizId, answer) {
    const conn = await connect();

    //  Verifica se questão já foi respondida 
    const answered = await conn.query(`SELECT COUNT(*) as count FROM heroku_65f5ce87b15f505.answer WHERE idQuiz = ${quizId} AND idStudent = ${userId} AND idQuestion = ${questionId};`);
    const count = utils.getUniqueResponseAttribute(answered, "count");

    if (count == 0) {
        console.log(`Questão de id = ${questionId} respondida pelo aluno de id = ${userId}`);
        //  Responde a questão
        await conn.query(`SET @@auto_increment_increment=1;`);
        await conn.query(`SET @@auto_increment_offset=1;`);
        await conn.query(`ALTER TABLE heroku_65f5ce87b15f505.answer AUTO_INCREMENT = 1;`);
        await conn.query(`INSERT INTO heroku_65f5ce87b15f505.answer (idQuiz, idStudent, idQuestion, answerSelected) VALUES (${quizId}, ${userId}, ${questionId}, "${answer}");`);
    } else {
        console.warn(`WARN: Questão de id = ${questionId} já foi respondida pelo aluno de id = ${userId}`);
    }

    conn.end();

    return 1;
}

module.exports = { authenticateStudent, selectStudentPersonalInfo, selectTestsToDo, selectTestsDone, answerQuestion };