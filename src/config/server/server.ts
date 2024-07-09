import * as express from 'express';
import * as middleware from '../middleware/index';
import * as Routes from '../../routes';
import config from '../env/index';

const app: express.Application = express();

middleware.configuration(app);
Routes.init(app)

app.set('port', config.port || 3000)

export default app;