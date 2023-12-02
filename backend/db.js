const mysql = require("mysql");

const conn = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
 });

//const conn = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "a7875747",
//  database: "crud",
//});

module.exports = conn;
