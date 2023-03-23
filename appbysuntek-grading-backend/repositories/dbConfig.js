"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Encrypter_1 = require("../services/crypto/Encrypter");
exports.default = {
    db: {
        host: Encrypter_1.default.decrypt("3fbfdbe67d3e5ff47fe590223569ca62a0c71ebc10290f7b0e2dfa47dc65a29d|548e422e61392cbcbc184727709abc0f"),
        user: Encrypter_1.default.decrypt("1d49e5324e12b047d7bdf2f624413603|3441c87100cbd3622fe8aa0c3b356132"),
        password: Encrypter_1.default.decrypt("75ef1ece58d68d2dbfe07cacbf1b0119|964813a17abcc49dfbd186b651e34ca7"),
        database: Encrypter_1.default.decrypt("c25dadf3d206fe577ddddf51d02f2051e169748126c3ab490e4cc7ccdf7c720b|9e099c7babdf6d569d3ce43b95a203ba"),
    },
    listPerPage: 10,
};
//# sourceMappingURL=dbConfig.js.map