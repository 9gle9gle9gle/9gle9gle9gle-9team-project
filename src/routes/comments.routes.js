import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';
import authmiddleware from '../middlewares/authmiddlewares';
const router = Router();

// 댓글 작성
router.post(
  '/cards/:cardId/comments',
  authmiddleware,
  CommentsController.createComment,
);

// 댓글 전체 조회
router.get(
  '/boards/:boardId/cards/:cardId/comments',
  authmiddleware,
  CommentsController.getComments,
);

// 댓글 수정
router.patch(
  '/cards/:cardId/comments/:commentId',
  authmiddleware,
  CommentsController.updateComment,
);

// 댓글 삭제
router.delete(
  '/cards/:cardId/comments/:commentId',
  authmiddleware,
  CommentsController.deleteComment,
);

export default router;
