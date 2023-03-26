export interface IEncrypter {
    encrypt(clearText: string): string;
    decrypt(encryptedText: string): string;
}