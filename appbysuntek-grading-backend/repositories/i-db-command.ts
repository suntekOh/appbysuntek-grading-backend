import { inject } from "tsyringe";

export interface IDbCommand {
    execute(sql: string, values: any): Promise<any>
}