import { inject } from "tsyringe";

export interface IDbCommand {
    execute(sql: string): Promise<any>
}