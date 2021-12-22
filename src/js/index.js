const express = require("express");
const mysql = require('mysql2');

const app = express();
const jsonParse = express.json();

const connectionOptions = {
  host: "localhost",
  user: "root",
  password: "MyN3wP4ssw0rd",
  database: "expertsurveys"
};

const con = mysql.createConnection(connectionOptions);

app.get("/api/getquestion/:questionid", function (req, res) {
  const sql = `SELECT * FROM Question WHERE id = ${req.params.questionid}`

  con.connect(function (err) {
    if (err) throw err;

    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.get("/api/getquestions", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;

    con.query(`SELECT * from Question`, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404)
    });
  });
});

app.post("/api/addquestion/", jsonParse, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);
  const sql = `INSERT INTO Question (id, type, text, survey_id) VALUES (${req.body.id},\"${req.body.type}\", \"${req.body.text}\", ${req.body.survey_id})`;

  con.connect(function (err) {
    if (err) throw err;

    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.delete("/api/deletequestion/:questionid", function (req, res) {
  const sql = `DELETE FROM Question WHERE id = ${req.params.questionid}`

  con.connect(function (err) {
    if (err) throw err;

    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.put("/api/updatequestion/:questionid", jsonParse, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);

  con.connect(function (err) {
    if (err) throw err;

    const sql = `UPDATE Question SET type = \"${req.body.type}\", text = \"${req.body.text}\", survey_id = \"${req.body.survey_id}\" WHERE id = ${req.params.questionid} `
    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.listen(2222);
