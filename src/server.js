
const pool = require('./config/database.js');
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Default response
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your Express server" });
});

// Get all the users in the database
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error querying from Database: ', error);
        res.status(500).send('Server Error');
    }
});

// Get specific user from the database
app.get("/api/users/:userID", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.userID]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error querying from Database: ', error);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;