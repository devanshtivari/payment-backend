"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const index_1 = require("../env/index");
function configuration(app) {
    app.set('trust proxy', 1); //enable to get client IP address from header
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(compression());
    const availableOrigin = index_1.default.origin.split(',');
    const corsOptions = {
        origin: function (origin, callback) {
            if (availableOrigin && availableOrigin.indexOf(origin) !== -1) {
                callback(null, { origin: true });
            }
            else {
                const customError = new Error('Unauthorised Access');
                customError.statusCode = 403;
                callback(customError);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST',
        credentials: false, // Include cookies or authorization headers
    };
    app.use(cors(corsOptions));
    // cors
    app.use((req, res, next) => {
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}
exports.configuration = configuration;
//# sourceMappingURL=index.js.map