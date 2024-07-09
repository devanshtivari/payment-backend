import {Request, Response} from 'express';
import { PromiseResolve } from '../../utils/interface';
import TransactionService from './service';

/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<any>}
 */
export async function addTransaction(req: Request, res: Response): Promise<any> {
    try {
        const addTransaction: PromiseResolve = await TransactionService.addTransaction(req.body);

        return res.status(addTransaction.status).send(addTransaction)
    } catch (error: any) {
        console.log("Error in addTransaction")

        return res.status(error.status).send({
            status: error.status || 400,
            error: true,
            message: error.message || 'Error in adding transaction'
        })
    }
}

/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<any>}
 */
export async function getBalance(req: Request, res: Response): Promise<any> {
    try {
        const balance: PromiseResolve = await TransactionService.fetchBalance();

        return res.status(balance.status).send(balance)
    } catch (error: any) {
        console.log("Error in getBalance")

        return res.status(error.status).send({
            status: error.status || 400,
            error: true,
            message: error.message || 'Error in fetching balance'
        })
    }
}