import Http from 'http';
import { ExpressApp } from './app.js';
import sequelize from './db/sequelize.js';
import Env from './env.js';
import { Boards } from './db/index.js';

export class Server {
  env = new Env();
  expressApp = new ExpressApp();
  httpServer;

  constructor() {
    this.httpServer = new Http.Server(this.expressApp.app);
  }

  databaseConnection = () => {
    return this.sequelizeAuthenticate().then(this.sequelizeSync);
  };

  sequelizeAuthenticate = () => {
    // test connection
    return sequelize.authenticate();
  };

  sequelizeSync = () => {
    return sequelize.sync({ force: false });
  };
  sihunjang225;
  runServer = async () => {
    try {
      await this.databaseConnection();
      return this.serverListen();
    } catch (e) {
      return this.serverErrorHandler(e);
    }
  };

  serverListen = () => {
    return this.httpServer.listen(this.env.port, () => {
      console.log(
        `Server is running on: http://${this.env.host}:${this.env.port}`,
      );
    });
  };

  serverErrorHandler = error => {
    console.log('Server run error: ', error.message);
  };
}

const server = new Server();

server.runServer();
