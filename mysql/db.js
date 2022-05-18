async function connect () {
    if (global.connection && global.connection.state != "disconnected") {
        return global.connection;
    }
    const mysql = require('mysql2/promise');
    const user = 'b1929a09a7817c';
    const password = '6ac73677';
    const adress = 'us-cdbr-east-05.cleardb.net';
    const db = 'heroku_65f5ce87b15f505';
    const connection = await mysql.createConnection(`mysql://${user}:${password}@${adress}/${db}`);
    global.connection = connection;
    console.log("conectou")
    return connection;
}

connect();

module.exports = {};