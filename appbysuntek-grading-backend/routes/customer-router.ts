import * as express from 'express';
import { Router } from 'express';
import { inject, injectable } from "tsyringe";
import { Constants } from '../models/constants';
import { ICustomerRepository } from '../repositories/i-customer-repository';
import { CustomerRepository } from '../repositories/implementations/customer-repository';

@injectable()
export class CustomerRouter {
    public router: Router;
    constructor(@inject(Constants.DI.ICustomerRepository) private customerRepository: ICustomerRepository) {
        this.router = express.Router();
        /* GET customer */
        this.router.get("/validateCustomer", async function (req, res, next) {
            try {
                res.json(await customerRepository.validateCustomer(req.query.user_name as string, req.query.password as string));
            } catch (err) {
                console.error(`Error while getting programming languages `, err.message);
                next(err);
            }
        });

        this.router.post("/", async function (req, res, next) {
            try {
                console.log(req.body);
                res.json(await customerRepository.create(req.body));
            } catch (err) {
                console.error(`Error while creating customer`, err.message);
                next(err);
            }
        });
    }
}

///* GET customer */
//router.get("/validateCustomer", async function (req, res, next) {
//    try {
//        res.json(await customerRepository.validateCustomer(req.query.user_name as string, req.query.password as string));
//    } catch (err) {
//        console.error(`Error while getting programming languages `, err.message);
//        next(err);
//    }
//});


///* POST customer */
//router.post("/", async function (req, res, next) {
//    try {
//        console.log(req.body);
//        res.json(await customerRepository.create(req.body));
//    } catch (err) {
//        console.error(`Error while creating customer`, err.message);
//        next(err);
//    }
//});

//export default router;


///* GET customer */
////router.get("/", async function (req, res, next) {
////    try {
////        res.json(await customerRepository.getMultiple(req.query.page));
////    } catch (err) {
////        console.error(`Error while getting programming languages `, err.message);
////        next(err);
////    }
////});


/////* PUT programming language */
////router.put("/:id", async function (req, res, next) {
////    try {
////        res.json(await programmingLanguages.update(req.params.id, req.body));
////    } catch (err) {
////        console.error(`Error while updating programming language`, err.message);
////        next(err);
////    }
////});

/////* DELETE programming language */
////router.delete("/:id", async function (req, res, next) {
////    try {
////        res.json(await programmingLanguages.remove(req.params.id));
////    } catch (err) {
////        console.error(`Error while deleting programming language`, err.message);
////        next(err);
////    }
////});

