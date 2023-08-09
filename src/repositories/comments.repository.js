import Comments from '../db/models/comments';

class CommentsRepository {
  // 댓글 작성
  static async createComment(cardId, userId, content) {
    const createComment = await Comments.create({ cardId, userId, content });
    return createComment;
  }
}

export default CommentsRepository;
