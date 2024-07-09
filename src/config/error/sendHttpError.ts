import { NextFunction, Request, Response } from 'express';
import { HttpError } from './index';

interface CustomResponse extends Response {
    sendHttpError: (error: HttpError, message ? : string) => void;
}

/**
 *
 * @param error Error
 * @returns {string} HTML response or empty string
 * @description generates HTML for response
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const generateHTML: Function = (error: HttpError): string => {
    if (error) {
        return '<div style=\'text-align: center;\'>'
            + `<p>Status: ${error.status}</p>`
            + `<p>Name: ${error.name}</p>`
            + `<p>${error.message}</p>`
        + '</div>';
    }

    return '';
};

export function sendHttpErrorModule(req: Request, res: CustomResponse, next: NextFunction): void {
    res.sendHttpError = (error: HttpError): void => {
        res.status(error.status);

        /**
         * if this looks like an AJAX request
         * if this request has a 'json' content-type AND ALSO has its 'Accept' header set
         * if this request DOESN'T explicitly want HTML
         */
        if (
            req.xhr
            || req.is('json')
            || (req.is('json') && req.get('Accept'))
            || !(req.get('Accept'))
        ) {
            res.json({
                status: error.status,
                name: error.name,
                message: error.message,
            });
        } else {
            res.send(generateHTML(error));
        }
    };

    next();
}
