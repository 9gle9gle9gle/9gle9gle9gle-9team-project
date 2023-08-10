import CommentsService from '../services/comments.service';

class CommentsController {
  // 댓글 작성
  static async createComment(req, res) {
    const { cardId } = req.params;
    const { content, boardId } = req.body;
    const userId = res.locals.user;
    //   const userId = req.locals.user;

    const { status, message } = await CommentsService.createComment(
      cardId,
      userId,
      content,
      boardId,
    );

    return res.status(status).json({ message });
  }

  // 댓글 전체 조회
  static async getComments(req, res) {
    const { cardId } = req.params;
    const userId = res.locals.user;
    const { boardId } = req.body;
    const { status, message } = await CommentsService.getComments(
      cardId,
      userId,
      boardId,
    );

    return res.status(status).json({ message });
  }

  // 댓글 수정
  static async updateComment(req, res) {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = res.locals.user;
    const { status, message } = await CommentsService.updateComment(
      commentId,
      content,
      userId,
    );

    return res.status(status).json({ message });
  }

  // 댓글 삭제
  static async deleteComment(req, res) {
    const { commentId } = req.params;
    const { deletedAt } = req.body;
    const userId = res.locals.user;
    const { status, message } = await CommentsService.deleteComment(
      commentId,
      deletedAt,
      userId,
    );

    return res.status(status).json({ message });
  }
}

export default CommentsController;
