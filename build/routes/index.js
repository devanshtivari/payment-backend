"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express = require("express");
const http = require("http");
const transaction_router_1 = require("./transaction.router");
function init(app) {
    const router = express.Router();
    app.use('/transaction', transaction_router_1.default);
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    app.use(router);
}
exports.init = init;
//# sourceMappingURL=index.js.map