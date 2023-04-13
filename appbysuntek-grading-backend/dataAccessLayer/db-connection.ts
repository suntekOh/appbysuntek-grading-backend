import * as mysql from "mysql2/promise";
import { inject, injectable } from "tsyringe";
import { Constants } from "../models/constants";
import { IDbConfig } from "./db-config";

export interface IDbConnection {
    pool: mysql.Pool;
}

@injectable()
export class DbConnection implements IDbConnection {
    pool: mysql.Pool;
    constructor(@inject(Constants.DI.IDbConfig) private dbConfig: IDbConfig) {
        this.pool = mysql.createPool({
            host: this.dbConfig.value.db.host,
            user: this.dbConfig.value.db.user,
            database: this.dbConfig.value.db.database,
            password: this.dbConfig.value.db.password,
            waitForConnections: this.dbConfig.value.db.waitForConnections,
            connectionLimit: this.dbConfig.value.db.connectionLimit,
            queueLimit: this.dbConfig.value.db.queueLimit
        })
    }
}
