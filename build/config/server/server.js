"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middleware = require("../middleware/index");
const Routes = require("../../routes");
const index_1 = require("../env/index");
const app = express();
middleware.configuration(app);
Routes.init(app);
app.set('port', index_1.default.port || 3000);
exports.default = app;
//# sourceMappingURL=server.js.map