// import CardsRepository from '../repositories/cards.repository.js';
import CommentsRepository from '../repositories/comments.repository.js';

class CommentsService {
  // 댓글 작성
  static async createComment(cardId, userId, content) {
    try {
      // 카드 유무 조회
      //   const existCard = await CardsRepository.existCard(cardId);

      //   if (!existCard) {
      //     return { status: 400, message: '카드가 존재하지 않습니다.' };
      //   }

      await CommentsRepository.createComment(cardId, userId, content);
      return { status: 200, message: '댓글 작성에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '댓글 작성에 실패하였습니다.' };
    }
  }

  // 댓글 전체 조회
  static async getComments(cardId) {
    try {
      // 카드 유무 조회
      //   const existCard = await CardsRepository.existCard(cardId);
      const comments = await CommentsRepository.getComments();

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
      return { status: 400, message: '댓글 조회에 실패하였습니다.' };
    }
  }
}

export default CommentsService;
