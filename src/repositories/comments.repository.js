import Comments from '../db/models/comments';
import Access from '../db/models/access';

class CommentsRepository {
  // 권한 확인
  static async isAccessable(userId, boardId) {
    const isAccessable = await Access.findOne({
      where: { userId, boardId },
    });
    return isAccessable;
  }

  // 댓글 작성
  static async createComment(cardId, userId, content) {
    const createComment = await Comments.create({ cardId, userId, content });
    return createComment;
  }

  // 댓글 전체 조회
  static async getComments(cardId) {
    const comments = await Comments.findAll({
      where: { cardId, deletedAt: null },
      order: [['createdAt', 'desc']],
    });
    return comments;
  }

  // 댓글 유무 조회
  static async existComment(commentId) {
    const existComment = await Comments.findOne({ where: { commentId } });
    return existComment;
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
  static async deleteComment(commentId, deletedAt) {
    const deleteComment = await Comments.update(
      { deletedAt },
      { where: { commentId } },
    );
    return deleteComment;
  }
}

export default CommentsRepository;
