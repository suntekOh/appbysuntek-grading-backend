import { inject, injectable } from "tsyringe";
import { Constants } from "../models/constants";
import { IDbConnection } from "./db-connection";
import * as mysql from "mysql2/promise";
import { ILogger } from "../services/logger/logger";

export interface IDbCommand {
    execute(sql: string, values: any): Promise<any>
}

@injectable()
export class DbCommand implements IDbCommand {
    private pool : mysql.Pool;
    constructor(
        @inject(Constants.DI.IConnectionPool) dbConnection: IDbConnection
    ) {
        this.pool = dbConnection.pool;
    }
    async execute(sql, values): Promise<any> {
        let conn: mysql.PoolConnection;
        try {
            //reference => https://github.com/sidorares/node-mysql2/issues/1505
            conn = await this.pool.getConnection();
            const [results] = await conn.execute(sql, values);
            return results;
        } catch (err) {
            throw err;
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }
}




