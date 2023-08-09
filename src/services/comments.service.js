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
}

export default CommentsService;
