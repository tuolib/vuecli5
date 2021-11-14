const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: dbConfig.charset,
  collation: dbConfig.collation,
});
// connection.getConnection(function(err, connection){
//   connection.beginTransaction()
// })

module.exports = connection;
