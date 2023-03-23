import dbConfig from "./dbConfig"
import pool from "./connectionPool";

interface IDbCommand {
    execute(sql: string): Promise<any>
}

class DbCommand implements IDbCommand {
    async execute(sql): Promise<any> {
        const [results] = await pool.execute(sql);
        return results;
    }

}

const dbCommand = new DbCommand(); // create an instance
export default dbCommand;



