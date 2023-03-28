import * as express from 'express';
import { Router } from 'express';
import { inject, injectable } from "tsyringe";
import { Constants } from '../models/constants';
import { NoRowAffectedError, PasswordNotMatchedError, UserNameAlreadyExistedError, UserNameNotFoundError } from '../models/errors/custom-errors';
import { ICustomerRepository } from '../dataAccessLayer/i-customer-repository';
import * as jwt from 'jsonwebtoken'
import { CustomerDto } from '../models/customer-dto';


@injectable()
export class CustomerRouter {
    public router: Router;
    constructor(@inject(Constants.DI.ICustomerRepository) private customerRepository: ICustomerRepository) {
        this.router = express.Router();
        /* GET customer */
        this.router.get("/verifyLogin", async function (req, res, next) {
            try {
                const verifyLoginResponse = await customerRepository.verifyLogin(req.query.user_name as string, req.query.password as string)
                if (verifyLoginResponse.succeeded) {
                    const jwt_token = jwt.sign(
                        { user_name: req.query.user_name },
                        process.env.JWT_TOKEN_SECRET,
                        { expiresIn: '1h' }
                    );
                    res.header("auth-token", jwt_token).json({ message: "verified user" });
                } else {
                    if (verifyLoginResponse.error instanceof UserNameNotFoundError) {
                        res.status(404).json({ message: verifyLoginResponse.error.message });
                    } else if (verifyLoginResponse.error instanceof PasswordNotMatchedError) {
                        res.status(400).json({ message: verifyLoginResponse.error.message });
                    } else {
                        res.status(500).json({ message: "Error during user verification" });
                    }
                }
            } catch (err) {
                console.error(`Error during user verification`, err.message);
                next(err);
            }
        });

        this.router.post("/register", async function (req, res, next) {
            try {
                console.log(req.body);
                const dto: CustomerDto = {
                    userName: req.body.user_name,
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password
                }

                const registerResponse = await customerRepository.register(dto);
                if (registerResponse.succeeded) {
                    res.json({ message: "user registered successfully" });
                } else {
                    if (registerResponse.error instanceof UserNameAlreadyExistedError) {
                        res.status(400).json({ message: registerResponse.error.message });
                    }
                    else if (registerResponse.error instanceof NoRowAffectedError) {
                        res.status(500).json({ message: registerResponse.error.message });
                    } else {
                        res.status(500).json({ message: "Error during user registration" });
                    }
                }
            } catch (err) {
                console.error(`Error during user registration`, err.message);
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

