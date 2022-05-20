const connect = require("./connection");

//  Retorna lista dos testes a serem feitos pelo usuario logado
async function selectTestsToDo(userId){
    const conn = await connect();
    return await conn.query(`SELECT user_id = ${userId};`)
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