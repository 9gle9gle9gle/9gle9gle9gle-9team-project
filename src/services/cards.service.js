import CardsRepository from '../repositories/cards.repository.js';

class CardsService {
  // 카드 생성
  static async createCard(userId, cardData) {
    try {
      const columnId = cardData.columnId;
      // column 존재 확인
      const existColumn = await CardsRepository.findColumn(columnId);

      if (!existColumn) {
        throw new Error('존재하지 않는 컬림입니다.');
      }
      if (!cardData.cardName || !cardData.cardContent) {
        throw new Error('카드 제목과 내용을 입력해주세요.');
      }

      const card = await CardsRepository.createCard(userId, cardData);
      return card;
    } catch (error) {
      throw new Error('카드 생성에 실패하였습니다.');
    }
  }
}

export default CardsService;
