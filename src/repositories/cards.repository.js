import Cards from '../db/models/cards';
import Columns from '../db/models/columns';

class CardsRepository {
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

  // 카드 전체 조회
  static async getCards() {
    const cards = await Cards.findAll({});
    return cards;
  }
}

export default CardsRepository;
