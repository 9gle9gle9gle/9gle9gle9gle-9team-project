import express from 'express';
import boardsRouter from './routes/boards.routes.js';
import columsRouter from './routes/colums.routes.js';
// users 라우터
import usersRouter from './routes/users.routes.js';

export class ExpressApp {
  app = express();
  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }

  setAppSettings = async () => {
    this.app.use(express.json());
  };
  setAppRouter = () => {
    this.app.use('/api', [boardsRouter, usersRouter], (error, request, response, next) => {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    });

    this.app.use('/ping', (req, res, next) => {
      return res.status(200).json({ message: 'pong' });
    });
  };
}
