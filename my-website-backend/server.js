const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: 'Supermatthew123$',  
  database: 'website_db'      
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Contact form handler
app.post('/contact', (req, res) => {
  const { name, message } = req.body;
  const sql = 'INSERT INTO messages (name, message) VALUES (?, ?)';
  db.query(sql, [name, message], (err, result) => {
    if (err) {
      console.error('Error inserting message:', err);
      return res.status(500).send('Database error.');
    }
    console.log('Message saved:', result);
    res.send('Message received!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});