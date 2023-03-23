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
exports.DbCommand = void 0;
const config_1 = require("../config");
const mysql = require("mysql2/promise");
class Db {
    query(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield mysql.createConnection(config_1.config.db);
            const [results] = yield connection.execute(sql);
            return results;
        });
    }
}
exports.DbCommand = new Db(); // create an instance
//# sourceMappingURL=db.js.map