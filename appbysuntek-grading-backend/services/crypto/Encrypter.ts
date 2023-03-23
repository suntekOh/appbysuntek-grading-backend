import * as crypto from 'crypto'
import cryptoConfig from './cryptoConfig'

interface IEncrypter {
    encrypt(clearText: string): string;
    decrypt(encryptedText: string): string;
}

class Encrypter implements IEncrypter {
    algorithm: string;
    key: Buffer;
    constructor(algorithm: string, encryptionKey: crypto.BinaryLike) {
        this.algorithm = algorithm;
        this.key = crypto.scryptSync(encryptionKey, "salt", 32);
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

const { secret_key, ecnryption_method } = cryptoConfig;

const encrypter = new Encrypter(ecnryption_method, secret_key);
export default encrypter;
