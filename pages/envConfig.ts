import dotenv from 'dotenv'

dotenv.config()

const {env} =  process;

export const envConfig = {
    accessTokenSecret: env.ACCESS_TOKEN_SECRET || 'secret',
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET || 'secret2',
    dbPath: env.DB_PATH || ''
}