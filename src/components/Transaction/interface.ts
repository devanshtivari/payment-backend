import { PromiseResolve } from "../../utils/interface";

export interface ITransactionBody {
    txnType: string;
    amount: number;
    reason: string;
}

export interface ITransactionService {
    /**
     * @param {ITransactionBody} body
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    addTransaction(body: ITransactionBody): Promise<PromiseResolve>;

    /**
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    fetchBalance(): Promise<PromiseResolve>;

    /**
     * @returns {Promise<PromiseResolve>}
     * @memberof TransactionService
     */
    addPrimaryData(): Promise<PromiseResolve>;
}