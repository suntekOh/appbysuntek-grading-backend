import * as mysql from "mysql2/promise";
import dbConfig from "./dbConfig";

const pool = mysql.createPool({
    host: dbConfig.db.host,
    user: dbConfig.db.user,
    database: dbConfig.db.database,
    password: dbConfig.db.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;