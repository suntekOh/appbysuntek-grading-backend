import * as jwt from 'jsonwebtoken'
import * as cookie from 'cookie'
import * as express from "express";
import { injectable } from "tsyringe";

export interface IAuthTokenCookieService {
    setAuthToken(res: Express.Response, userName: string): void;
}

@injectable()
export class AuthTokenCookieService implements IAuthTokenCookieService {
    private cookieOptions: any;
    constructor() {
        if (process.env.NODE_ENV == 'development') {
            this.cookieOptions = {
                httpOnly: true,    // safety, does not allow cookie to be read in the frontend javascript
                maxAge: 60 * 30, 
                sameSite: 'Strict' // works for local development
            }
        } else {
            // these options work on a https server
            this.cookieOptions = {
                httpOnly: true,    
                maxAge: 60 * 30, 
                sameSite: 'None', 
                secure: true
            }

        }
    }

    setAuthToken(res: express.Response, userName: string  ) {
        const jwt_token = jwt.sign({ user_name: userName }, process.env.JWT_TOKEN_SECRET, { expiresIn: '30m' });
        res.setHeader('Set-Cookie',
            [
                cookie.serialize('auth-token', jwt_token, this.cookieOptions),
            ]);
    }
}