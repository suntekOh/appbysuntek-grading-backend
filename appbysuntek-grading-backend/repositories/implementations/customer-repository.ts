import { Guid } from "guid-typescript";
import { inject, injectable } from "tsyringe";
import { DbCommand } from "./db-command";
import dbConfig from "../db-config";
import { ICustomerRepository } from "../i-customer-repository";
import { IDbCommand } from "../i-db-command";
import { Constants } from "../../models/constants";
import { IQueryHelper } from "../i-query-helper";

@injectable()
export class CustomerRepository implements ICustomerRepository {
    constructor(
        @inject(Constants.DI.IDbCommand) private dbCommand: IDbCommand,
        @inject(Constants.DI.IQueryHelper) private queryHelper: IQueryHelper
    ) { }

    async validateCustomer(user_name: string, password: string): Promise<any> {
        const rows = await this.dbCommand.execute(
            `SELECT * FROM customer where userName= "${user_name}" AND password = "${password}"`
        );

        const data = this.queryHelper.emptyOrRows(rows);
        return { data };
    }
    //async getMultiple(page: number): Promise<any> {
    //    const offset = queryHelper.getOffset(page, dbConfig.listPerPage);
    //    const rows = await dbCommand.query(
    //        `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
    //    FROM customer LIMIT ${offset},${dbConfig.listPerPage}`
    //    );
    //    const data = queryHelper.emptyOrRows(rows);
    //    const meta = { page };

    //    return {
    //        data,
    //        meta,
    //    };
    //}

    async create(customer: any): Promise<any> {
        const result = await this.dbCommand.execute(
            `INSERT INTO customer(userName, firstName, lastName, email, password) VALUES("${customer.user_name}", "${customer.first_name}", "${customer.last_name}", "${customer.email}", "${customer.password}")`);

        let message = "Error in creating programming language";

        if (result.affectedRows) {
            message = "Customer created successfully";
        }

        return { message };
    }

    getMultiple(page: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    update(id: Guid, customer: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: Guid): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

//const customerRepository = new CustomerRepository(); // create an instance
//export default customerRepository;


//async function getMultiple(page = 1) {
//    const offset = helper.getOffset(page, config.listPerPage);
//    const rows = await db.query(
//        `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
//    FROM customer LIMIT ${offset},${config.listPerPage}`
//    );
//    const data = helper.emptyOrRows(rows);
//    const meta = { page };

//    return {
//        data,
//        meta,
//    };
//}

//async function create(programmingLanguage) {
//    const result = await db.query(
//        `INSERT INTO customer 
//    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
//    VALUES 
//    ("${programmingLanguage.name}", ${programmingLanguage.released_year}, ${programmingLanguage.githut_rank}, ${programmingLanguage.pypl_rank}, ${programmingLanguage.tiobe_rank})`
//    );

//    let message = "Error in creating programming language";

//    if (result.affectedRows) {
//        message = "Programming language created successfully";
//    }

//    return { message };
//}

//async function update(id, programmingLanguage) {
//    const result = await db.query(
//        `UPDATE customer 
//    SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, githut_rank=${programmingLanguage.githut_rank}, 
//    pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
//    WHERE id=${id}`
//    );

//    let message = "Error in updating programming language";

//    if (result.affectedRows) {
//        message = "Programming language updated successfully";
//    }

//    return { message };
//}

//async function remove(id) {
//    const result = await db.query(
//        `DELETE FROM customer WHERE id=${id}`
//    );

//    let message = "Error in deleting programming language";

//    if (result.affectedRows) {
//        message = "Programming language deleted successfully";
//    }

//    return { message };
//}

//module.exports = {
//    getMultiple,
//    create,
//    update,
//    remove,
//};