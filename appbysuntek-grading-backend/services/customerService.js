"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const db_1 = require("./db");
class CustomerRepository {
    getMultiple(page) {
        throw new Error("Method not implemented.");
    }
    create(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.DbCommand.query(`INSERT INTO customer(nickname, firstname, lastname, email, password) VALUES("${customer.nick_name}", "${customer.first_name}", "${customer.last_name}", "${customer.email}", "${customer.password}")`);
            let message = "Error in creating programming language";
            if (result.affectedRows) {
                message = "Customer created successfully";
            }
            return { message };
        });
    }
    update(id, customer) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
}
exports.CustomerService = new CustomerRepository(); // create an instance
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
//# sourceMappingURL=customerService.js.map