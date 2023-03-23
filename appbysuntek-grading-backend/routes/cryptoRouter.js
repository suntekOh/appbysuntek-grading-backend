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
const express = require("express");
const Encrypter_1 = require("../services/crypto/Encrypter");
const router = express.Router();
/* POST programming language */
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { clear_text } = req.body;
            const encrypted = Encrypter_1.default.encrypt(clear_text);
            const dencrypted = Encrypter_1.default.decrypt(encrypted);
            res.json({ worked: clear_text === dencrypted });
        }
        catch (err) {
            console.error(`error during /crypto POST request`, err.message);
            next(err);
        }
    });
});
exports.default = router;
//# sourceMappingURL=cryptoRouter.js.map