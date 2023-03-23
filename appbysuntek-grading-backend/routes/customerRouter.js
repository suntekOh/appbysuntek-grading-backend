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
const customerRepository_1 = require("../repositories/customerRepository");
const router = express.Router();
/* GET customer */
router.get("/validateCustomer", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield customerRepository_1.default.validateCustomer(req.query.user_name, req.query.password));
        }
        catch (err) {
            console.error(`Error while getting programming languages `, err.message);
            next(err);
        }
    });
});
/* POST customer */
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            res.json(yield customerRepository_1.default.create(req.body));
        }
        catch (err) {
            console.error(`Error while creating customer`, err.message);
            next(err);
        }
    });
});
exports.default = router;
/* GET customer */
//router.get("/", async function (req, res, next) {
//    try {
//        res.json(await customerRepository.getMultiple(req.query.page));
//    } catch (err) {
//        console.error(`Error while getting programming languages `, err.message);
//        next(err);
//    }
//});
///* PUT programming language */
//router.put("/:id", async function (req, res, next) {
//    try {
//        res.json(await programmingLanguages.update(req.params.id, req.body));
//    } catch (err) {
//        console.error(`Error while updating programming language`, err.message);
//        next(err);
//    }
//});
///* DELETE programming language */
//router.delete("/:id", async function (req, res, next) {
//    try {
//        res.json(await programmingLanguages.remove(req.params.id));
//    } catch (err) {
//        console.error(`Error while deleting programming language`, err.message);
//        next(err);
//    }
//});
//# sourceMappingURL=customerRouter.js.map