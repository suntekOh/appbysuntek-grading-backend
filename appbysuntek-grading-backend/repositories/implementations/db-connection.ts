import * as mysql from "mysql2/promise";
import { injectable } from "tsyringe";
import dbConfig from "../db-config";
import { IDbConnection } from "../i-db-connection";

@injectable()
export class DbConnection implements IDbConnection {
    pool: mysql.Pool;
    constructor() {
        this.pool = mysql.createPool({
            host: dbConfig.db.host,
            user: dbConfig.db.user,
            database: dbConfig.db.database,
            password: dbConfig.db.password,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }
}
