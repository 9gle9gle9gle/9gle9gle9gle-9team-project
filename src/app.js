import express from 'express';
import boardsRouter from './routes/boards.routes.js';
import columsRouter from './routes/columns.routes.js';
import cardsRouter from './routes/cards.routes.js';
import userRouter from './routes/users.routes.js';
import commentsRouter from './routes/comments.routes.js';
import accessRouter from './routes/access.routes.js';

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
    this.app.use(
      '/api',
      [
        boardsRouter,
        columsRouter,
        cardsRouter,
        userRouter,
        commentsRouter,
        accessRouter,
      ],
      (error, request, response, next) => {
        response.status(400).json({
          success: false,
          error: error.message,
        });
      },
    );

    this.app.use('/ping', (req, res, next) => {
      return res.status(200).json({ message: 'pong' });
    });
  };
}
