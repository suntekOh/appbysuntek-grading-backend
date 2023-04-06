import * as jwt from 'jsonwebtoken'

export interface IAuthTokenCookieService {
    setAuthToken(res: Express.Response, userName: string): void;
}