const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

// Crear un cliente de Postgres
const pool = new Pool({
  host: "utilapis.cd0ibul9ttgs.sa-east-1.rds.amazonaws.com",
  database: "utilapis",
  user: "user_nodeapp",
  password: "_Passw0rd_",
  port: 5432,
});

// GET
app.get("/users", async (req, res) => {
  const users = await pool.query("SELECT * FROM auth.user");
  res.send(users.rows);
});

// POST
app.get("/users/add", async (req, res) => {
  const username = "usuario" + new Date().getTime();
  const email = username + "@example.com";
  const result = await pool.query(
    "INSERT INTO auth.user (username, email, created_on) VALUES ($1, $2, NOW())",
    [username, email]
  );
  res.send(result);
});

// GET
app.get("/users/:username", async (req, res) => {
  const username = req.params.username;
  const users = await pool.query(
    "SELECT * FROM auth.user WHERE username = $1",
    [username]
  );
  res.send(users.rows);
});

// PUT
app.get("/users/update/:username", async (req, res) => {
  const username = req.params.username;
  const newUsername = "usuario" + new Date().getTime();
  const newEmail = newUsername + "@example.com";
  const result = await pool.query(
    "UPDATE auth.user SET username = $1, email = $2 WHERE username = $3",
    [newUsername, newEmail, username]
  );
  res.send(result);
});

// DELETE
app.get("/users/delete/:username", async (req, res) => {
  const username = req.params.username;
  const result = await pool.query("DELETE FROM auth.user WHERE username = $1", [
    username,
  ]);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/users`);
});
