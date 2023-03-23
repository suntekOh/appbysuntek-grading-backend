"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const cryptoConfig_1 = require("./cryptoConfig");
class Encrypter {
    constructor(algorithm, encryptionKey) {
        this.algorithm = algorithm;
        this.key = crypto.scryptSync(encryptionKey, "salt", 32);
    }
    encrypt(clearText) {
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
        if (!iv)
            throw new Error("IV not found");
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, "hex"));
        return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
    }
}
const { secret_key, ecnryption_method } = cryptoConfig_1.default;
const encrypter = new Encrypter(ecnryption_method, secret_key);
exports.default = encrypter;
//# sourceMappingURL=Encrypter.js.map