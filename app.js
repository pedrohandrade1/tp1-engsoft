const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

const students = require('./routes/students');
const teachers = require('./routes/teachers');
const tests = require('./routes/tests');

app.use("/students", students);
app.use("/teachers", teachers);
app.use("/tests", tests);

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