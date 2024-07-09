"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnect = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../env/index");
const service_1 = require("../../components/Transaction/service");
const sequelizeOptions = {
    dialect: 'mysql',
    host: index_1.default.database.MYSQL_HOST,
    port: index_1.default.database.MYSQL_PORT,
    username: index_1.default.database.MYSQL_USERNAME,
    password: index_1.default.database.MYSQL_PASSWORD,
    database: index_1.default.database.MYSQL_DATABASE,
    logging: false,
};
const sequelize = new sequelize_1.Sequelize(sequelizeOptions);
function databaseConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            yield sequelize.sync({ alter: true });
            yield service_1.default.addPrimaryData();
            console.log("MYSQL connected ");
        }
        catch (error) {
            console.error(`MYSQL ${error}`);
        }
    });
}
exports.databaseConnect = databaseConnect;
databaseConnect();
exports.default = sequelize;
//# sourceMappingURL=index.js.map