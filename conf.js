const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'vera',
  password: 'password',
  database: 'fil_rouge',
});

module.exports=connection;