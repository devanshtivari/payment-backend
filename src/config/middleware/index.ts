import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import config from '../env/index';

export function configuration(app: express.Application): void {
    app.set('trust proxy', 1) //enable to get client IP address from header
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json())
    app.use(compression())

    const availableOrigin: string[] = config.origin.split(',');

    const corsOptions: cors.CorsOptions = {
        origin: function (origin: any, callback: any) {
            if (availableOrigin && availableOrigin.indexOf(origin) !== -1) {
                callback(null, { origin: true })
            } else {
                const customError: any = new Error('Unauthorised Access');
                customError.statusCode = 403;
                callback(customError);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST',
        credentials: false, // Include cookies or authorization headers
    }

    app.use(cors(corsOptions));
    // cors
    app.use((req, res, next) => {
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}
