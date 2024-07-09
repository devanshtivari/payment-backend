import { NextFunction, Response, Request } from "express";
import { JoiValidationResult } from "../utils/interface";
import TransactionValidation from '../components/Transaction/validation';

/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */
export async function validateTransaction(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const validate: JoiValidationResult = await TransactionValidation.validateTransaction(req.body)
        if(validate.error) {
            throw new Error(validate.message);
        }
        req.body = validate.value;
        next();
    } catch (error: any) {
        console.log(`Error in Validation :: ${error}`)

        return res.status(400).send({
            status: 400,
            error: true,
            message: error.message || 'Error in validation'
        })
    }
}

