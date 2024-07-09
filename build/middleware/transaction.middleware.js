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
exports.validateTransaction = void 0;
const validation_1 = require("../components/Transaction/validation");
/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */
function validateTransaction(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validate = yield validation_1.default.validateTransaction(req.body);
            if (validate.error) {
                throw new Error(validate.message);
            }
            req.body = validate.value;
            next();
        }
        catch (error) {
            console.log(`Error in Validation :: ${error}`);
            return res.status(400).send({
                status: 400,
                error: true,
                message: error.message || 'Error in validation'
            });
        }
    });
}
exports.validateTransaction = validateTransaction;
//# sourceMappingURL=transaction.middleware.js.map