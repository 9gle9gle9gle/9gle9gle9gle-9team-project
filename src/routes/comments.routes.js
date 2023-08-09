import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';
const router = Router();

// 댓글 작성
router.post('/cards/:cardId/comments', CommentsController.createComment);

// 댓글 전체 조회
router.get('/cards/:cardId/comments', CommentsController.getComments);

export default router;
