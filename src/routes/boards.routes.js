import { Router } from 'express';
import BoardsController from '../controllers/boards.controller';
import authmiddleware from '../middlewares/authmiddlewares';

const router = Router();
const boardsController = new BoardsController();

router.post('/boards', authmiddleware, boardsController.makeBoard);
router.get('/boards', authmiddleware, boardsController.getBoards);
router.get('/boards/:boardId', authmiddleware, boardsController.showCards);
router.patch('/boards/:boardId', authmiddleware, boardsController.updateBoard);
router.delete('/boards/:boardId', authmiddleware, boardsController.removeBoard);

export default router;
