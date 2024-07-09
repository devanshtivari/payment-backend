import { Model, DataTypes } from "sequelize";
import sequelize from '../../config/connection/index';

export interface ITransactionModel extends Model {
    txnType: string;
    amount: number;
    reason: string;
    balance: number;
    txnTime: Date;
}

const Transaction = sequelize.define<ITransactionModel>(
    'Transaction',
    {
        txnType: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['CREDIT', 'DEBIT']
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        txnTime: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'transaction',
        timestamps: true
    }
)

export default Transaction;