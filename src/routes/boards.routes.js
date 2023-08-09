import { Router } from 'express';
import BoardsController from '../controllers/boards.controller';

const router = Router();
const boardsController = new BoardsController();

router.post('/boards', boardsController.makeBoard);
router.get('/boards', boardsController.getBoards);
router.get('/boards/:boardId', boardsController.showABoard);
router.patch('/boards/:boardId', boardsController.updateBoard);

export default router;
