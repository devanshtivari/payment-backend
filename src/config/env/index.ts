import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    database: {
        MYSQL_PORT: number,
        MYSQL_HOST: string,
        MYSQL_USERNAME: string,
        MYSQL_PASSWORD: string,
        MYSQL_DATABASE: string
    },
    origin: string,
    port: number,
    balance: number
}

const config: IConfig = {
    database: {
        MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
        MYSQL_HOST: process.env.MYSQL_HOST ?? 'localhost',
        MYSQL_USERNAME: process.env.MYSQL_USERNAME ?? 'root',
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ?? '<PASSWORD>',
        MYSQL_DATABASE: process.env.MYSQL_DATABASE ?? 'users_db',
    },
    origin: process.env.ALLOWED_ORIGIN ?? '',
    port: Number(process.env.PORT) || 3000,
    balance: Number(process.env.BALANCE) || 0
}

export default config;