"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHttpErrorModule = void 0;
/**
 *
 * @param error Error
 * @returns {string} HTML response or empty string
 * @description generates HTML for response
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const generateHTML = (error) => {
    if (error) {
        return '<div style=\'text-align: center;\'>'
            + `<p>Status: ${error.status}</p>`
            + `<p>Name: ${error.name}</p>`
            + `<p>${error.message}</p>`
            + '</div>';
    }
    return '';
};
function sendHttpErrorModule(req, res, next) {
    res.sendHttpError = (error) => {
        res.status(error.status);
        /**
         * if this looks like an AJAX request
         * if this request has a 'json' content-type AND ALSO has its 'Accept' header set
         * if this request DOESN'T explicitly want HTML
         */
        if (req.xhr
            || req.is('json')
            || (req.is('json') && req.get('Accept'))
            || !(req.get('Accept'))) {
            res.json({
                status: error.status,
                name: error.name,
                message: error.message,
            });
        }
        else {
            res.send(generateHTML(error));
        }
    };
    next();
}
exports.sendHttpErrorModule = sendHttpErrorModule;
//# sourceMappingURL=sendHttpError.js.map