import * as express from 'express';
import encrypter from '../services/crypto/Encrypter'
import dbConfig from '../repositories/dbConfig'

const router = express.Router();

/* POST programming language */
router.post("/", async function (req, res, next) {
    try {
        const { clear_text } = req.body;
        const encrypted = encrypter.encrypt(clear_text);
        const dencrypted = encrypter.decrypt(encrypted);

        res.json({ worked: clear_text === dencrypted });
    } catch (err) {
        console.error(`error during /crypto POST request`, err.message);
        next(err);
    }
});


export default router;