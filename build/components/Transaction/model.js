"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("../../config/connection/index");
const Transaction = index_1.default.define('Transaction', {
    txnType: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: ['CREDIT', 'DEBIT']
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reason: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    txnTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'transaction',
    timestamps: true
});
exports.default = Transaction;
//# sourceMappingURL=model.js.map