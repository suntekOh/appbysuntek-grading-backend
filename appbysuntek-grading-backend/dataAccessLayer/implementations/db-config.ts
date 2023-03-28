import { inject, injectable } from "tsyringe";
import { Constants } from "../../models/constants";
import { IEncrypter } from "../../services/crypto/i-encrypter";
import { IDbConfig } from "../i-db-config";
@injectable()
export class DbConfig implements IDbConfig {
    public value: any;
    constructor(@inject(Constants.DI.IEncrypter) encrypter: IEncrypter) {
        this.value = {
            db:
            {
                host: encrypter.decrypt(process.env.HOST),
                user: encrypter.decrypt(process.env.USER),
                password: encrypter.decrypt(process.env.PASSWORD),
                database: encrypter.decrypt(process.env.DATABASE),
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            },
            listPerPage: 10
        }
    };
}
