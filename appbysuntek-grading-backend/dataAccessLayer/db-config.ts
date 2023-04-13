import { inject, injectable } from "tsyringe";
import { Constants } from "../models/constants";
import { IEncrypter } from "../services/crypto/encrypter";

export interface IDbConfig {
    value: any;
}

@injectable()
export class DbConfig implements IDbConfig {
    public value: any;
    constructor(@inject(Constants.DI.IEncrypter) encrypter: IEncrypter) {
        this.value = {
            db:
            {
                host: encrypter.decrypt(process.env.DB_HOST),
                user: encrypter.decrypt(process.env.DB_USER),
                password: encrypter.decrypt(process.env.DB_PASSWORD),
                database: encrypter.decrypt(process.env.DB_SCHEMA),
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            },
            listPerPage: 10
        }
    };
}
