const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "marcos",
  database: "crudgame",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { sabor } = req.body;

  let mysql = "INSERT INTO games ( name, cost, sabor) VALUES (?, ?, ?)";
  db.query(mysql, [name, cost, sabor], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { sabor } = req.body;

  let mysql =
    "SELECT * from games WHERE name = ? AND cost = ? AND sabor = ?";
  db.query(mysql, [name, cost, sabor], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM games";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { sabor } = req.body;
  let mysql = "UPDATE games SET name = ?, cost = ?, sabor = ? WHERE id = ?";
  db.query(mysql, [name, cost, sabor, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM games WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});