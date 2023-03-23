import * as dotenv from 'dotenv'

dotenv.config();

const { SECRET_KEY, ECNRYPTION_METHOD } = process.env

export default {
    secret_key: SECRET_KEY,
    ecnryption_method: ECNRYPTION_METHOD,
}