import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const auth_token: string = req.header('auth-token');

    if (!auth_token) {
        res.status(401).json({ message: 'No token provided!' });
    } else {
        jwt.verify(auth_token, process.env.JWT_TOKEN_SECRET, (err) => {
            if (err) {
                res.status(401).json({ mesage: err.message });
            } else {
                next();
            }
        });
    }
}