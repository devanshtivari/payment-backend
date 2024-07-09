import { JoiValidationResult } from "../../utils/interface";
import * as joi from 'joi';
import * as joiOptions from '../../utils/joiOptions';

class TransactionValidation {
    /**
     * @returns {Promise<JoiValidationResult>}
     * @memberof TransactionValidation
     */
    async validateTransaction(params: object): Promise<JoiValidationResult> {
        try {
            const schema: joi.Schema = joi.object().keys({
                txnType: joi.string().required().trim().uppercase().valid('CREDIT', 'DEBIT').label('Transaction Type'),
                amount: joi.number().required().min(0).max(100000).label('Amount'),
                reason: joi.string().trim().optional().label('Reason')
            })

            const {error, value} = await schema.validate(params, joiOptions.options);
            if (error) {
                return {
                    error: true,
                    value: '',
                    message: error.details[0].message,
                }
            }
            return {
                error: false,
                value,
            }
        } catch (error: any) {
            console.log(`Error in TransactionValidation :: ${error}`)

            return {
                error: true,
                value: '',
                message: 'Something went wrong'
            }
        }
    }
}

export default new TransactionValidation;