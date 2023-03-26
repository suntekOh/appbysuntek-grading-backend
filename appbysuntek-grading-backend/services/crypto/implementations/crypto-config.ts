import * as dotenv from 'dotenv'
import { injectable } from 'tsyringe';
import { ICryptoConfig } from '../i-crypto-config';


@injectable()
export class CryptoConfig implements ICryptoConfig {
    public value: any;
    constructor() {
        dotenv.config();
        this.value = {
            secret_key: process.env.SECRET_KEY,
            ecnryption_method: process.env.ECNRYPTION_METHOD,
        }
    }
}
