import CardsRepository from '../repositories/cards.repository.js';

class CardsService {
  // 카드 생성
  static async createCard(userId, cardData, boardId) {
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

      const isAccessable = await CardsRepository.isAccessable(userId, boardId);

      if (!isAccessable)
        return { status: 400, message: '접근 권한이 없습니다.' };

      const getAllCard = await CardsRepository.getAllCard(cardData.columnId);
      const cardOrder = getAllCard.length + 1;

      const createdcard = await CardsRepository.createCard(
        userId,
        cardData,
        cardOrder,
      );
      await CardsRepository.addWorker(userId, createdcard.cardId);
      return { status: 201, message: '카드 작성에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '카드 작성에 실패하였습니다.' };
    }
  }

  // 카드 상세 조회
  static async getCard(userId, cardId) {
    try {
      const existCard = await CardsRepository.existCard(cardId);
      if (!existCard)
        return { status: 400, message: '카드 조회에 실패하였습니다.' };

      const card = await CardsRepository.getCard(cardId);

      if (card) return { status: 200, message: card };
      else return { status: 400, message: '카드 조회에 실패하였습니다.' };
    } catch (error) {
      console.log(error);
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
    columnId,
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

      const getWorker = await CardsRepository.getOneWorker(userId, cardId);
      if (!getWorker) {
        return { status: 400, message: '권한이 없습니다.' };
      }
      await CardsRepository.updateCard(
        cardId,
        cardName,
        cardColor,
        cardContent,
        cardOrder,
        columnId,
      );

      return { status: 200, message: '카드 수정에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
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

      await CardsRepository.deleteCard(cardId, deletedAt);

      return { status: 200, message: '카드 삭제에 성공하였습니다.' };
    } catch (error) {
      return { status: 400, message: '카드 삭제에 실패하였습니다.' };
    }
  }

  // 카드 순서 UP
  static async cardUp(cardId) {
    try {
      await CardsRepository.cardUp(cardId);

      return { status: 200, message: '카드 순서 수정에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '카드 순서 수정에 실패하였습니다.' };
    }
  }

  // 카드 순서 DOWN
  static async cardDown(cardId) {
    try {
      await CardsRepository.cardDown(cardId);

      return { status: 200, message: '카드 순서 수정에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '카드 순서 수정에 실패하였습니다.' };
    }
  }

  // 작업자 등록
  static async addWorker(userId, cardId, boardId) {
    try {
      if (!userId || !cardId || !boardId) {
        return { status: 400, message: '정확한 정보가 없습니다.' };
      }
      // 카드 유무 조회
      const existCard = await CardsRepository.existCard(cardId);

      if (!existCard) {
        return { status: 400, message: '카드가 존재하지 않습니다.' };
      }

      // 작업자 중복 조회
      const sameworker = await CardsRepository.getOneWorker(userId, cardId);

      if (sameworker) {
        return { status: 400, message: '이미 작업자로 참여하고 있습니다.' };
      }

      const isAccessable = await CardsRepository.isAccessable(userId, boardId);

      if (!isAccessable)
        return { status: 400, message: '접근 권한이 없습니다.' };

      await CardsRepository.addWorker(userId, cardId);
      return { status: 201, message: '작업자 등록에 성공하였습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '작업자 등록에 실패하였습니다.' };
    }
  }

  // 작업자 조회
  static async getWorker(userId, cardId, boardId) {
    try {
      if (!userId || !cardId || !boardId) {
        return { status: 400, message: '정확한 정보가 없습니다.' };
      }
      // 카드 유무 조회
      const existCard = await CardsRepository.existCard(cardId);

      if (!existCard) {
        return { status: 400, message: '카드가 존재하지 않습니다.' };
      }

      const isAccessable = await CardsRepository.isAccessable(userId, boardId);

      if (!isAccessable)
        return { status: 400, message: '접근 권한이 없습니다.' };

      const getWorker = await CardsRepository.getWorker(cardId);
      return { status: 201, message: getWorker };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '작업자 조회에 실패하였습니다.' };
    }
  }
}

export default CardsService;
