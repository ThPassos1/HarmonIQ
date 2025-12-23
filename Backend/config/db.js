const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // ou o usuário do seu MySQL
  password: "",        // sua senha (ou vazio se não tiver)
  database: "harmoniq"
});

module.exports = pool;
