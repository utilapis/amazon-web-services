const express = require("express");
const app = express();
const port = 3000;

const {
  DynamoDBClient,
  ListTablesCommand,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");

// Crear un cliente de DynamoDB
const db = new DynamoDBClient({ region: "sa-east-1" });

// GET
app.get("/list-tables", async (req, res) => {
  const response = await db.send(new ListTablesCommand({}));
  res.send(response.TableNames);
});

// GET
app.get("/list-items/:tableName", async (req, res) => {
  const tableName = req.params.tableName;
  const response = await db.send(new ScanCommand({ TableName: tableName }));
  res.send(response.Items);
});

// POST
app.get("/add-item/:tableName", async (req, res) => {
  const tableName = req.params.tableName;
  const newUsername = "usuario" + new Date().getTime();
  const newEmail = newUsername + "@example.com";
  const objectParams = {
    TableName: tableName,
    Item: {
      username: { S: newUsername },
      email: { S: newEmail },
      created_on: { S: new Date().toISOString() }
    },
  };
  const response = await db.send(new PutItemCommand(objectParams));
  res.send(response);
});

// DELETE
app.get("/delete-item/:tableName/:username", async (req, res) => {
  const tableName = req.params.tableName;
  const username = req.params.username;
  const objectParams = {
    TableName: tableName,
    Key: {
      username: { S: username }
    },
  };
  const response = await db.send(new DeleteItemCommand(objectParams));
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/list-tables`);
});
