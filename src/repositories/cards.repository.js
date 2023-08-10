import Cards from '../db/models/cards';
import Columns from '../db/models/columns';
import Access from '../db/models/access';

class CardsRepository {
  // 보드 권한 확인
  static async isAccessable(userId, boardId) {
    const isAccessable = await Access.findOne({ where: { userId, boardId } });
    return isAccessable;
  }

  // 컬럼 조회
  static async findColumn(columnId) {
    const existColumn = await Columns.findOne({ where: { columnId } });
    return existColumn;
  }

  // 카드 생성
  static async createCard(userId, cardData) {
    const card = await Cards.create({ userId, ...cardData });
    return card;
  }

  // 카드 개별 조회
  static async getCard(cardId) {
    const card = await Cards.findOne({ where: { cardId, deletedAt: null } });
    return card;
  }

  // 카드 유무 조회
  static async existCard(cardId) {
    const existCard = await Cards.findOne({ where: { cardId } });
    return existCard;
  }

  // 카드 수정
  static async updateCard(cardId, cardName, cardColor, cardContent, cardOrder) {
    const updateCard = await Cards.update(
      {
        cardName,
        cardColor,
        cardContent,
        cardOrder,
      },
      { where: { cardId } },
    );
    return updateCard;
  }

  // 카드 삭제
  static async deleteCard(cardId, deletedAt) {
    const deleteCard = await Cards.update({ deletedAt }, { where: { cardId } });
    return deleteCard;
  }
}

export default CardsRepository;
