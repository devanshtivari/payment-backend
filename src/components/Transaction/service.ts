import config from '../../config/env';
import { PromiseResolve } from "../../utils/interface";
import { ITransactionBody, ITransactionService } from "./interface";
import Transaction, { ITransactionModel } from "./model";

const TransactionService: ITransactionService = {
    /**
     * @param {ITransactionBody} body
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    async addTransaction(body: ITransactionBody): Promise<PromiseResolve> {
        try {
            const date: Date = new Date();
            const txnTime: string = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();

            const balance: {balance: number} = await Transaction.findOne({ order: [ ['createdAt', 'DESC' ]], attributes: ['balance']});
            if(balance) {
                const createQuery: ITransactionModel = await Transaction.create({
                    txnType: body.txnType,
                    amount: body.amount,
                    reason: body.reason,
                    balance: body.txnType === 'CREDIT' ? balance.balance + body.amount : balance.balance - body.amount,
                    txnTime: txnTime
                })

                if(createQuery) {
                    return {
                        status: 200,
                        error: false,
                        message: 'Transaction added successfully',
                        data: createQuery.balance
                    }
                }

                throw new Error('Error in adding transaction to database')
            }
            throw new Error('Error in fetching latest entry')
        } catch (error) {
            console.log(`Add transaction Error :: ${error}`);

            return {
                status: 400,
                error: true,
                message: 'addTransaction Error'
            }
        }
    },

    /**
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    async fetchBalance(): Promise<PromiseResolve> {
        try {
            const balance: {balance: number} = await Transaction.findOne({ order: [ ['createdAt', 'DESC' ]], attributes: ['balance']});
            if(balance) {
                return {
                    status: 200,
                    error: false,
                    message: 'Data fetched Successfully',
                    data: balance.balance
                }
            }
            throw new Error('Error in fetching latest balance')
        } catch (error) {
            console.log(`fetchBalance Error :: ${error}`);

            return {
                status: 400,
                error: true,
                message: error || 'addTransaction Error'
            }
        }
    },

    /**
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    async addPrimaryData(): Promise<PromiseResolve> {
        try {
            const date: Date = new Date();

            await Transaction.create({
                id: 1,
                txnType: 'CREDIT',
                amount: 0,
                reason: 'initial DB',
                balance: config.balance,
                txnTime: date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
            }, {ignoreDuplicates: true})
            console.log('Added primary data')
            return {
                status: 201,
                error: false,
                message: 'Added primary data'
            }
        } catch (error: any) {
            console.log(`addPrimaryData Error :: ${error}`);

            return {
                status: 400,
                error: true,
                message: 'Error in adding primary data'
            }
        }
    },

    /**
     * @param {number} pageNumber
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    async getTransactionHistory(pageNumber: number): Promise<PromiseResolve> {
        try {
            const query: ITransactionModel[] = await Transaction.findAll({ raw: true, order: [['txnTime', 'DESC']], attributes: ['id', 'txnType', 'amount', 'txnTime'] , limit: 10, offset: pageNumber*10 });
            const count: number = await Transaction.count();
            if(query.length > 0) {
                return {
                    status: 200,
                    error: false,
                    message: 'Data fetched Successfully',
                    data: {
                        rows: query,
                        totalPages: Math.ceil(count/10)
                    }
                }
            }
            throw new Error('No data in database')
        } catch (error: any) {
            console.log(`getTransactionHistory error :: ${error}`)

            return {
                status: 400,
                error: true,
                message: 'Error in fetching balance'
            }
        }
    },
}

export default TransactionService;