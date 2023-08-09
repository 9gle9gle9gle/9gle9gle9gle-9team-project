import Comments from '../db/models/comments';

class CommentsRepository {
  // 댓글 작성
  static async createComment(cardId, userId, content) {
    const createComment = await Comments.create({ cardId, userId, content });
    return createComment;
  }

  // 댓글 전체 조회
  static async getComments() {
    const comments = await Comments.findAll({
      order: [['createdAt', 'desc']],
    });
    return comments;
  }

  // 댓글 수정
  static async updateComment(commentId, content) {
    const updateComment = await Comments.update(
      { content },
      { where: { commentId } },
    );
    return updateComment;
  }

  // 댓글 삭제
  static async deleteComment(commentId) {
    const deleteComment = await Comments.destroy({ where: { commentId } });
    return deleteComment;
  }
}

export default CommentsRepository;
