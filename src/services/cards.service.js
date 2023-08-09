import CardsRepository from '../repositories/cards.repository.js';

class CardsService {
  // 카드 생성
  static async createCard(userId, cardData) {
    try {
      const columnId = cardData.columnId;
      // column 존재 확인
      const existColumn = await CardsRepository.findColumn(columnId);

      if (!existColumn) {
        return { status: 400, message: '존재하지 않는 컬림입니다.' };
      }
      if (!cardData.cardName || !cardData.cardContent) {
        return { status: 400, message: '카드 제목과 내용을 입력해주세요.' };
      }

      await CardsRepository.createCard(userId, cardData);
      return { status: 201, message: '카드 작성에 성공하였습니다.' };
    } catch (error) {
      return { status: 400, message: '카드 작성에 실패하였습니다.' };
    }
  }

  // 카드 전체 조회
  static async getCards() {
    try {
      const cards = await CardsRepository.getCards();

      if (cards.length === 0) {
        return {
          status: 200,
          message: '카드가 없습니다.  카드 생성을 진행해 주세요.',
        };
      }

      return { status: 200, message: cards };
    } catch (error) {
      return { status: 400, message: '카드 조회에 실패하였습니다.' };
    }
  }

  // 카드 수정
  static async updateCard(
    cardId,
    userId,
    cardName,
    cardColor,
    cardContent,
    cardOrder,
  ) {
    try {
      // 카드 유무 조회
      const existCard = await CardsRepository.existCard(cardId);

      if (!existCard) {
        return { status: 400, message: '카드가 존재하지 않습니다.' };
      }
      if (!cardName || !cardContent) {
        return { status: 400, message: '카드 제목과 내용을 입력해주세요.' };
      }
      if (userId !== existCard.userId) {
        return { status: 400, message: '수정 권한이 존재하지 않습니다.' };
      }

      await CardsRepository.updateCard(
        cardId,
        cardName,
        cardColor,
        cardContent,
        cardOrder,
      );

      return { status: 200, message: '카드 수정에 성공하였습니다.' };
    } catch (error) {
      return { status: 400, message: '카드 수정에 실패하였습니다.' };
    }
  }

  // 카드 삭제
  static async deleteCard(cardId, userId, deletedAt) {
    try {
      // 카드 유무 조회
      const existCard = await CardsRepository.existCard(cardId);

      if (!existCard) {
        return { status: 400, message: '카드가 존재하지 않습니다.' };
      }
      if (!deletedAt) {
        return { status: 400, message: '삭제일을 입력해주세요.' };
      }
      if (userId !== existCard.userId) {
        return { status: 400, message: ' 삭제 권한이 존재하지 않습니다.' };
      }

      await CardsRepository.deleteCard(cardId);

      return { status: 200, message: '카드 삭제에 성공하였습니다.' };
    } catch (error) {
      return { status: 400, message: '카드 삭제에 실패하였습니다.' };
    }
  }
}

export default CardsService;
