import debug from 'debug';
import { Address } from 'cluster';
/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
// eslint-disable-next-line no-undef
export function onError(error: NodeJS.ErrnoException, port: number | string | boolean): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind: string = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;

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

/**
 * @export onListening
 */
export function onListening(this: any): void {
    const addr: Address = this.address();
    const bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log(`Listening on ${bind}`);
}
