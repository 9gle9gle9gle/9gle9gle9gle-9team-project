import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';
const router = Router();

router.post('/cards/:cardId/comments', CommentsController.createComment);

export default router;
