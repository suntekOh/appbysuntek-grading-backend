import * as express from 'express';
import { Router } from 'express';
import { inject, injectable } from "tsyringe";
import { Constants } from '../models/constants';
import { IEncrypter } from '../services/crypto/encrypter';


@injectable()
export class CryptoRouter {
    public router: Router;
    constructor(@inject(Constants.DI.IEncrypter) private encrypter: IEncrypter) {
        this.router = express.Router();
        this.router.post("/", async function (req, res, next) {
            try {
                const { clear_text } = req.body;
                const encrypted = encrypter.encrypt(clear_text);
                const dencrypted = encrypter.decrypt(encrypted);
                res.json({ worked: clear_text === dencrypted });
            } catch (err) {
                next(err);
            }
        });
    }
}
