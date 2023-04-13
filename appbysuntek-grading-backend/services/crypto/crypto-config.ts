import { injectable } from 'tsyringe';

export interface ICryptoConfig {
    value: any;
}

@injectable()
export class CryptoConfig implements ICryptoConfig {
    public value: any;
    constructor() {
        this.value = {
            secret_key: process.env.SECRET_KEY,
            ecnryption_method: process.env.ECNRYPTION_METHOD,
        }
    }
}
