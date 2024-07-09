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
exports.getBalance = exports.addTransaction = void 0;
const service_1 = require("./service");
/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<any>}
 */
function addTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const addTransaction = yield service_1.default.addTransaction(req.body);
            return res.status(addTransaction.status).send(addTransaction);
        }
        catch (error) {
            console.log("Error in addTransaction");
            return res.status(error.status).send({
                status: error.status || 400,
                error: true,
                message: error.message || 'Error in adding transaction'
            });
        }
    });
}
exports.addTransaction = addTransaction;
/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<any>}
 */
function getBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const balance = yield service_1.default.fetchBalance();
            return res.status(balance.status).send(balance);
        }
        catch (error) {
            console.log("Error in getBalance");
            return res.status(error.status).send({
                status: error.status || 400,
                error: true,
                message: error.message || 'Error in fetching balance'
            });
        }
    });
}
exports.getBalance = getBalance;
//# sourceMappingURL=index.js.map