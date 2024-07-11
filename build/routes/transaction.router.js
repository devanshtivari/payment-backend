"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const components_1 = require("../components");
const router = (0, express_1.Router)();
router.post('/add', middleware_1.validateTransaction, components_1.addTransaction);
router.get('/balance', components_1.getBalance);
router.get('/history/?:page', components_1.getTransactionHistory);
exports.default = router;
//# sourceMappingURL=transaction.router.js.map