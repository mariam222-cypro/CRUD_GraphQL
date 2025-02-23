const express = require("express");
const parseGraphQLQuery = require("./graphql-parser");
const Database = require("better-sqlite3");


const app = express();
const PORT = 4000;

app.use(express.json());

// create db

this.db = new Database('users.db', { verbose: console.log });

this.db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
    )
`);

// setup server

app.get("/", (req, res) => {
  res.send("Welcome to our GraphQL API!");
});

app.post('/graphql', (req, res) => {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "No GraphQL query found" });
    }
  
    const parsedQuery = parseGraphQLQuery(query);
    res.json(parsedQuery);  
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
