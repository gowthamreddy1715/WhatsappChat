const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: "localhost" ,
  user: "root",
  password: "lumiq123",
  database: "sys"
});

conn.connect(err => {
  if (err) console.error('Database connection failed:', err);
  else console.log('MySQL connected');
});

module.exports = conn;
