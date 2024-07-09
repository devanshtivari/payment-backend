"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const config = {
    database: {
        MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
        MYSQL_HOST: (_a = process.env.MYSQL_HOST) !== null && _a !== void 0 ? _a : 'localhost',
        MYSQL_USERNAME: (_b = process.env.MYSQL_USERNAME) !== null && _b !== void 0 ? _b : 'root',
        MYSQL_PASSWORD: (_c = process.env.MYSQL_PASSWORD) !== null && _c !== void 0 ? _c : '<PASSWORD>',
        MYSQL_DATABASE: (_d = process.env.MYSQL_DATABASE) !== null && _d !== void 0 ? _d : 'users_db',
    },
    origin: (_e = process.env.ALLOWED_ORIGIN) !== null && _e !== void 0 ? _e : '',
    port: Number(process.env.PORT) || 3000,
    balance: Number(process.env.BALANCE) || 0
};
exports.default = config;
//# sourceMappingURL=index.js.map