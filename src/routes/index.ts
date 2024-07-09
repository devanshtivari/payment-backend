import * as express from 'express';
import * as http from 'http';
import TransactionRouter from './transaction.router';

export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/transaction', TransactionRouter);

    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use(router)
}