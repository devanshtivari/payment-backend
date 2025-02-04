"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onListening = exports.onError = void 0;
/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
// eslint-disable-next-line no-undef
function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.log(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
exports.onError = onError;
/**
 * @export onListening
 */
function onListening() {
    const addr = this.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}
exports.onListening = onListening;
//# sourceMappingURL=serverHandler.js.map