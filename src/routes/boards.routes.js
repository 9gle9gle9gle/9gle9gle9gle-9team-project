import { Router } from 'express';
import BoardsController from '../controllers/boards.controller';

const router = Router();
const boardsController = new BoardsController();

router.post('/boards', boardsController.makeBoard);
router.get('/boards', boardsController.getBoards);

export default router;
