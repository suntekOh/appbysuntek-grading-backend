"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY, ECNRYPTION_METHOD } = process.env;
exports.default = {
    secret_key: SECRET_KEY,
    ecnryption_method: ECNRYPTION_METHOD,
};
//# sourceMappingURL=cryptoConfig.js.map