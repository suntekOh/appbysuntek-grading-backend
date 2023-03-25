import dbConfig from "../db-config"
import { IDbCommand } from "../i-db-command";
import { singleton, inject, injectable } from "tsyringe";
import { Constants } from "../../models/constants";
import { IDbConnection } from "../i-db-connection";
import * as mysql from "mysql2/promise";

@injectable()
export class DbCommand implements IDbCommand {
    private pool : mysql.Pool;
    constructor(@inject(Constants.DI.IConnectionPool) dbConnection: IDbConnection) {
        this.pool = dbConnection.pool;
    }
    async execute(sql): Promise<any> {
        const [results] = await this.pool.execute(sql);
        return results;
    }
}




