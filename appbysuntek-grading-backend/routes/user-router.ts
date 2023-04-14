import * as express from 'express';
import { Router } from 'express';
import { inject, injectable } from "tsyringe";
import { Constants } from '../models/constants';
import { NoRowAffectedError, PasswordNotMatchedError, UserNameAlreadyExistedError, UserNameNotFoundError } from '../models/errors/custom-errors';
import { IUserRepository } from '../dataAccessLayer/user-repository';
import * as jwt from 'jsonwebtoken'
import { UserDto } from '../models/user-dto';
import { IAuthTokenCookieService } from '../services/jwt-token-cookie-service/auth-token-cookie-service';
import { ILogger } from '../services/logger/logger';


@injectable()
export class UserRouter {
    public router: Router;
    constructor(
        @inject(Constants.DI.IUserRepository) private userRepository: IUserRepository,
        @inject(Constants.DI.IAuthTokenCookieService) private authTokenCookieService: IAuthTokenCookieService,
        @inject(Constants.DI.ILogger) private logger: ILogger,
    ) {
        this.router = express.Router();
        /* GET user */
        this.router.get("/verifyLogin", async function (req, res, next) {
            try {
                const verifyLoginResponse = await userRepository.verifyLogin(req.query.userName as string, req.query.password as string)
                if (verifyLoginResponse.succeeded) {
                    authTokenCookieService.setAuthToken(res, req.query.user_name as string);
                    res.json({ message: "verified user" });

                } else {
                    if (verifyLoginResponse.error instanceof UserNameNotFoundError) {
                        res.status(404).json({ message: verifyLoginResponse.error.message });
                    } else if (verifyLoginResponse.error instanceof PasswordNotMatchedError) {
                        res.status(401).json({ message: verifyLoginResponse.error.message });
                    } else {
                        res.status(500).json({ message: "Error during user verification" });
                    }
                }
            } catch (err) {
                next(err);
            }
        });

        this.router.post("/register", async function (req, res, next) {
            try {
                const dto: UserDto = {
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                }

                const registerResponse = await userRepository.register(dto);
                if (registerResponse.succeeded) {
                    res.json({ message: "user registered successfully" });
                } else {
                    if (registerResponse.error instanceof UserNameAlreadyExistedError) {
                        res.status(403).json({ message: registerResponse.error.message });
                    }
                    else if (registerResponse.error instanceof NoRowAffectedError) {
                        res.status(500).json({ message: registerResponse.error.message });
                    } else {
                        res.status(500).json({ message: "Error during user registration" });
                    }
                }
            } catch (err) {
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

