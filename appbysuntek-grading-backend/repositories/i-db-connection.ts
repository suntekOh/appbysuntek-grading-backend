import * as mysql from "mysql2/promise";

export interface IDbConnection {
    pool: mysql.Pool;
}
