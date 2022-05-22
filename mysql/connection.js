const mysql = require('mysql2/promise');

//  Conecta ao banco de dados do Heroku
async function connect () {

    //  Credenciais do banco
    const user = 'b1929a09a7817c';
    const password = '6ac73677';
    const adress = 'us-cdbr-east-05.cleardb.net';
    const db = 'heroku_65f5ce87b15f505';

    //  Conexão
    const connection = await mysql.createConnection(`mysql://${user}:${password}@${adress}/${db}`);

    return connection;
}

module.exports = connect;