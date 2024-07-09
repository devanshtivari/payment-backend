import * as http from 'http';
import * as serverHandler from './serverHandler';
import Server from './server';


const server: http.Server = http.createServer(Server);

server.listen(Server.get('port'), serverHandler.onListening.bind(server));
server.on('error', (error: Error) => serverHandler.onError(error, Server.get('port')));