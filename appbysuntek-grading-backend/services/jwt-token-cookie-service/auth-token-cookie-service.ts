import * as jwt from 'jsonwebtoken'
import * as cookie from 'cookie'
import * as express from "express";
import { injectable } from "tsyringe";

export interface IAuthTokenCookieService {
    setAuthToken(res: Express.Response, userName: string): void;
}

@injectable()
export class AuthTokenCookieService implements IAuthTokenCookieService {
    //private cookieOptions: any;
    //constructor() {
    //    // Set Cookie
    //    this.cookieOptions = {
    //        httpOnly: true,    // safety, does not allow cookie to be read in the frontend javascript
    //        maxAge: 24 * 3600 * 1, // cookie age in seconds
    //        sameSite: 'Strict' // works for local development
    //    }

    //    if (process.env.NODE_ENV === 'production') {

    //        // these options work on a https server
    //        this.cookieOptions.secure = true
    //        this.cookieOptions.sameSite = 'None'
    //    }
    //}


    setAuthToken(res: express.Response, userName: string  ) {
        const jwt_token = jwt.sign({ user_name: userName }, process.env.JWT_TOKEN_SECRET, { expiresIn: '30m' });

        res.setHeader('Set-Cookie',
            [
                cookie.serialize('auth-token', jwt_token, {
                    httpOnly: true, maxAge: 60 * 30, sameSite: 'Strict'
                }),
                //cookie.serialize('user-name', userName, {
                //    httpOnly: true, maxAge: 60 * 30, sameSite: 'Strict'
                //})

            ]);
    }
}