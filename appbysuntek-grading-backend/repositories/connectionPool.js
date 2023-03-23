"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2/promise");
const dbConfig_1 = require("./dbConfig");
const pool = mysql.createPool({
    host: dbConfig_1.default.db.host,
    user: dbConfig_1.default.db.user,
    database: dbConfig_1.default.db.database,
    password: dbConfig_1.default.db.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
//# sourceMappingURL=connectionPool.js.map