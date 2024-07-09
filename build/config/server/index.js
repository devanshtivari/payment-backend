"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const serverHandler = require("./serverHandler");
const server_1 = require("./server");
const server = http.createServer(server_1.default);
server.listen(server_1.default.get('port'), serverHandler.onListening.bind(server));
server.on('error', (error) => serverHandler.onError(error, server_1.default.get('port')));
//# sourceMappingURL=index.js.map