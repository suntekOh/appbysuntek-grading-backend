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
const connectionPool_1 = require("./connectionPool");
class DbCommand {
    execute(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield connectionPool_1.default.execute(sql);
            return results;
        });
    }
}
const dbCommand = new DbCommand(); // create an instance
exports.default = dbCommand;
//# sourceMappingURL=dbCommand.js.map