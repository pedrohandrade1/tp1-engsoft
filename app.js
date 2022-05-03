const express = require('express');
const app = express();
const users = require('./routes/users');

app.use("/users", users);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const DOMAIN = "localhost";
const PORT = process.env.port || 5500;

app.listen(PORT, (error) => {
    if (error) {
        return console.error("Error: ", error);
    }
    console.log(`Server running... at  http://${DOMAIN}:${PORT}/`)
});