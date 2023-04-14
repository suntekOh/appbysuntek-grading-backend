import * as crypto from 'crypto'
import { inject, injectable } from 'tsyringe';
import { Constants } from '../../models/constants';
import { ICryptoConfig } from './crypto-config';

export interface IEncrypter {
    encrypt(clearText: string): string;
    decrypt(encryptedText: string): string;
}

@injectable()
export class Encrypter implements IEncrypter {
    private algorithm: string;
    private key: Buffer;
    constructor(
        @inject(Constants.DI.ICryptoConfig) private config: ICryptoConfig) {
        this.algorithm = config.value.ecnryption_method;
        this.key = crypto.scryptSync(config.value.secret_key, "salt", 32);
    }

    encrypt(clearText: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        const encrypted = cipher.update(clearText, "utf8", "hex");
        return [
            encrypted + cipher.final("hex"),
            Buffer.from(iv).toString("hex"),
        ].join("|");
    }

    decrypt(encryptedText) {
        const [encrypted, iv] = encryptedText.split("|");
        if (!iv) throw new Error("IV not found");
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.key,
            Buffer.from(iv, "hex")
        );
        return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
    }
}