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
const env_1 = require("../../config/env");
const model_1 = require("./model");
const TransactionService = {
    /**
     * @param {ITransactionBody} body
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    addTransaction(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                const txnTime = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
                const balance = yield model_1.default.findOne({ order: [['createdAt', 'DESC']], attributes: ['balance'] });
                if (balance) {
                    const createQuery = yield model_1.default.create({
                        txnType: body.txnType,
                        amount: body.amount,
                        reason: body.reason,
                        balance: body.txnType === 'CREDIT' ? balance.balance + body.amount : balance.balance - body.amount,
                        txnTime: txnTime
                    });
                    if (createQuery) {
                        return {
                            status: 200,
                            error: false,
                            message: 'Transaction added successfully',
                            data: createQuery.balance
                        };
                    }
                    throw new Error('Error in adding transaction to database');
                }
                throw new Error('Error in fetching latest entry');
            }
            catch (error) {
                console.log(`Add transaction Error :: ${error}`);
                return {
                    status: 400,
                    error: true,
                    message: 'addTransaction Error'
                };
            }
        });
    },
    /**
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    fetchBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const balance = yield model_1.default.findOne({ order: [['createdAt', 'DESC']], attributes: ['balance'] });
                if (balance) {
                    return {
                        status: 200,
                        error: false,
                        message: 'Data fetched Successfully',
                        data: balance.balance
                    };
                }
                throw new Error('Error in fetching latest balance');
            }
            catch (error) {
                console.log(`fetchBalance Error :: ${error}`);
                return {
                    status: 400,
                    error: true,
                    message: error || 'addTransaction Error'
                };
            }
        });
    },
    /**
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    addPrimaryData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                yield model_1.default.create({
                    id: 1,
                    txnType: 'CREDIT',
                    amount: 0,
                    reason: 'initial DB',
                    balance: env_1.default.balance,
                    txnTime: date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
                }, { ignoreDuplicates: true });
                console.log('Added primary data');
                return {
                    status: 201,
                    error: false,
                    message: 'Added primary data'
                };
            }
            catch (error) {
                console.log(`addPrimaryData Error :: ${error}`);
                return {
                    status: 400,
                    error: true,
                    message: 'Error in adding primary data'
                };
            }
        });
    },
    /**
     * @param {number} pageNumber
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    getTransactionHistory(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield model_1.default.findAll({ raw: true, order: [['txnTime', 'DESC']], attributes: ['id', 'txnType', 'amount', 'txnTime'], limit: 10, offset: pageNumber * 10 });
                if (query.length > 0) {
                    return {
                        status: 200,
                        error: false,
                        message: 'Data fetched Successfully',
                        data: query
                    };
                }
                throw new Error('No data in database');
            }
            catch (error) {
                console.log(`getTransactionHistory error :: ${error}`);
                return {
                    status: 400,
                    error: true,
                    message: 'Error in fetching balance'
                };
            }
        });
    },
};
exports.default = TransactionService;
//# sourceMappingURL=service.js.map