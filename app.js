const path = require("path");

const cors = require('cors');

const express = require('express');
const session = require('express-session');

const app = express();
app.use(cors());

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

//  Defines static paths
app.use("/assets", express.static(path.resolve(__dirname, "./frontend/assets")));
app.use("/css", express.static(path.resolve(__dirname, "./frontend/css")));
app.use("/js", express.static(path.resolve(__dirname, "./frontend/js")));
//app.use("/html", express.static(path.resolve(__dirname, "./frontend/html")));

app.get("/login/students/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/html/login/students.html"));
});

app.get("/home/students/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/html/home/students.html"));
});

app.get("/login/teachers/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/html/login/teachers.html"));
});

app.get("/home/teachers/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/html/home/teachers.html"));
});

app.get("/test/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/html/solve_test.html"));
});

const DOMAIN = "localhost";
const PORT = process.env.port || 5500;

app.listen(PORT, (error) => {
  if (error) {
    return console.error("Error: ", error);
  }
  console.log(`Server running... at:\nhttp://${DOMAIN}:${PORT}/login/students/\nhttp://${DOMAIN}:${PORT}/login/teachers/`)
});