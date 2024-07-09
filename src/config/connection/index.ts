import { Options, Sequelize } from 'sequelize';
import config from '../env/index';
import TransactionService from '../../components/Transaction/service';

const sequelizeOptions: Options = {
    dialect: 'mysql',
    host: config.database.MYSQL_HOST,
    port: config.database.MYSQL_PORT,
    username: config.database.MYSQL_USERNAME,
    password: config.database.MYSQL_PASSWORD,
    database: config.database.MYSQL_DATABASE,
    logging: false,     
}

const sequelize: Sequelize = new Sequelize(sequelizeOptions);

export async function databaseConnect(): Promise<void> {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true })
        await TransactionService.addPrimaryData()
        console.log("MYSQL connected ")
    } catch (error) {
        console.error(`MYSQL ${error}`)
    }
}

databaseConnect();
export default sequelize;