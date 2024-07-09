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
const joi = require("joi");
const joiOptions = require("../../utils/joiOptions");
class TransactionValidation {
    /**
     * @returns {Promise<JoiValidationResult>}
     * @memberof TransactionValidation
     */
    validateTransaction(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = joi.object().keys({
                    txnType: joi.string().required().trim().uppercase().valid('CREDIT', 'DEBIT').label('Transaction Type'),
                    amount: joi.number().required().min(0).max(100000).label('Amount'),
                    reason: joi.string().trim().optional().label('Reason')
                });
                const { error, value } = yield schema.validate(params, joiOptions.options);
                if (error) {
                    return {
                        error: true,
                        value: '',
                        message: error.details[0].message,
                    };
                }
                return {
                    error: false,
                    value,
                };
            }
            catch (error) {
                console.log(`Error in TransactionValidation :: ${error}`);
                return {
                    error: true,
                    value: '',
                    message: 'Something went wrong'
                };
            }
        });
    }
}
exports.default = new TransactionValidation;
//# sourceMappingURL=validation.js.map