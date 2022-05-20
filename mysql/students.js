const connect = require("./connection");

//  Retorna lista dos testes a serem feitos pelo usuario logado
async function selectTestsToDo(userId){
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

//  Retorna lista dos testes feitos pelo usuario logado
async function selectTestsDone(userId){
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId};`)
}

//  Retorna informações sobre um teste especifico feito pelo usuario logado
/*async function selectTestDoneInfo(userId, testId){
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId} AND test_id = ${testId};`)
}*/

module.exports = {selectTestsToDo, selectTestsDone};