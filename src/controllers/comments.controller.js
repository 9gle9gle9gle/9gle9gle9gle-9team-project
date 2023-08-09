import CommentsService from '../services/comments.service';

class CommentsController {
  // 댓글 작성
  static async createComment(req, res) {
    const { cardId } = req.params;
    const { content } = req.body;
    const userId = 1;
    //   const userId = req.locals.user;

    const { status, message } = await CommentsService.createComment(
      cardId,
      userId,
      content,
    );

    return res.status(status).json({ message });
  }
}

export default CommentsController;
