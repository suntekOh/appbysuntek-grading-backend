import { Guid } from "guid-typescript";
import { inject, injectable } from "tsyringe";
import { DbCommand } from "./db-command";
import dbConfig from "../db-config";
import { ICustomerRepository } from "../i-customer-repository";
import { IDbCommand } from "../i-db-command";
import { Constants } from "../../models/constants";
import { IQueryHelper } from "../i-query-helper";
import { IEncrypter } from "../../services/crypto/i-encrypter";
import { NoRowAffectedError, PasswordNotMatchedError, UserNameAlreadyExistedError, UserNameNotFoundError } from "../../models/errors/custom-errors";
import { ResponseDto } from "../../models/response-dto";
import { CustomerDto } from "../../models/customer-dto";

@injectable()
export class CustomerRepository implements ICustomerRepository {
    constructor(
        @inject(Constants.DI.IDbCommand) private dbCommand: IDbCommand,
        @inject(Constants.DI.IQueryHelper) private queryHelper: IQueryHelper,
        @inject(Constants.DI.IEncrypter) private encrypter: IEncrypter,
    ) { }

    async isExistUserName(user_name: string): Promise<boolean> {
        const customer = await this.dbCommand.execute(
            'SELECT * FROM `customer` WHERE `userName` = ? limit 0,1',
            [user_name]
        );

        if (customer.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async verifyLogin(user_name: string, password: string): Promise<ResponseDto> {
        const customer = await this.dbCommand.execute(
            'SELECT * FROM `customer` WHERE `userName` = ? limit 0,1',
            [user_name]
        );

        let response: ResponseDto;

        if (customer.length === 0) {
            response = {
                succeeded: false,
                error: new UserNameNotFoundError(`${user_name} doesn't exist!`),
            }
        } else if (this.encrypter.decrypt(customer[0].password) != password) {
            response = {
                succeeded: false,
                error: new PasswordNotMatchedError(`password doesn't match.`),
            }
        } else {
            response = {
                succeeded: true
            }
        }

        return response;
    }

    async register(customer: CustomerDto): Promise<ResponseDto> {
        let response: ResponseDto;

        if (await this.isExistUserName(customer.userName)) {
            response = {
                succeeded: false,
                error: new UserNameAlreadyExistedError(`${customer.userName} already existed`),
            }
        } else {
            const result = await this.dbCommand.execute(
                'INSERT INTO `customer` (`userName`, `firstName`, `lastName`, `email`, `password`) VALUES(?, ?, ?, ?, ?)',
                [customer.userName, customer.firstName, customer.lastName, customer.email, this.encrypter.encrypt(customer.password)]
            );

            if (result.affectedRows > 0) {
                response = {
                    succeeded: true,
                }
            } else {
                response = {
                    succeeded: false,
                    error: new NoRowAffectedError(`user registration failed`),
                }
            }
        }

        return response;
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