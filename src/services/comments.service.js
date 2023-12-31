// import CardsRepository from '../repositories/cards.repository.js';
import CommentsRepository from '../repositories/comments.repository.js';

class CommentsService {
  // 댓글 작성
  static async createComment(cardId, userId, content, boardId) {
    try {
      if (!content) {
        return { status: 400, message: '내용을 입력해주세요.' };
      }

      const isAccessable = await CommentsRepository.isAccessable(
        userId,
        boardId,
      );
      if (!isAccessable)
        return { status: 400, message: '댓글 작성에 실패하였습니다.' };
      await CommentsRepository.createComment(cardId, userId, content);
      return { status: 200, message: '댓글 작성에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '댓글 작성에 실패하였습니다.' };
    }
  }

  // 댓글 전체 조회
  static async getComments(cardId, userId, boardId) {
    try {
      const isAccessable = await CommentsRepository.isAccessable(
        userId,
        boardId,
      );
      if (!isAccessable)
        return { status: 400, message: '댓글 작성에 실패하였습니다.' };

      // 카드 유무 조회
      //   const existCard = await CardsRepository.existCard(cardId);
      const comments = await CommentsRepository.getComments(cardId);

      //   if (!existCard) {
      //     return { status: 400, message: '카드가 존재하지 않습니다.' };
      //   }
      if (comments.length === 0) {
        return {
          status: 200,
          message: '댓글이 없습니다. 첫 작성자가 되어 주세요.',
        };
      }

      return { status: 200, message: comments };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '댓글 조회에 실패하였습니다.' };
    }
  }

  // 댓글 수정
  static async updateComment(commentId, content, userId) {
    try {
      // 카드 유무 조회
      //   const existCard = await CardsRepository.existCard(cardId);
      // 댓글 유무 조회
      const existComment = await CommentsRepository.existComment(commentId);

      //   if (!existCard) {
      //     return { status: 400, message: '카드가 존재하지 않습니다.' };
      //   }
      if (!existComment) {
        return { status: 400, message: '댓글이 존재하지 않습니다.' };
      }
      if (!content) {
        return { status: 400, message: '내용을 입력해주세요.' };
      }
      if (existComment.userId !== userId)
        return { status: 400, message: '댓글 수정에 실패하였습니다.' };

      await CommentsRepository.updateComment(commentId, content);

      return { status: 200, message: '댓글 수정에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '댓글 수정에 실패하였습니다.' };
    }
  }

  // 댓글 삭제
  static async deleteComment(commentId, deletedAt, userId) {
    try {
      // 카드 유무 조회
      //   const existCard = await CardsRepository.existCard(cardId);
      // 댓글 유무 조회
      const existComment = await CommentsRepository.existComment(commentId);

      //   if (!existCard) {
      //     return { status: 400, message: '카드가 존재하지 않습니다.' };
      //   }
      if (!existComment) {
        return { status: 400, message: '댓글이 존재하지 않습니다.' };
      }
      if (!deletedAt) {
        return { status: 400, message: '삭제일을 입력해주세요.' };
      }
      if (existComment.userId !== userId)
        return { status: 400, message: '댓글 삭제에 실패하였습니다.' };

      await CommentsRepository.deleteComment(commentId, deletedAt);

      return { status: 200, message: '댓글 삭제에 성공하였습니다.' };
    } catch (error) {
      return { status: 400, message: '댓글 삭제에 실패하였습니다.' };
    }
  }
}

export default CommentsService;
