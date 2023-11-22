import config from '../config.js';
import mysql from 'mysql';

// Creating the MySQL connection
const db = mysql.createConnection({
    host: config.SQL_SERVER_HOST,
    port: config.SQL_SERVER_PORT,
    user: config.SQL_SERVER_USER,
    password: config.SQL_SERVER_PASSWORD,
    database: config.SQL_SERVER_DB,
});
  
db.connect();

export default db;