import Cards from '../db/models/cards';
import Columns from '../db/models/columns';
import Access from '../db/models/access';
import Workers from '../db/models/workers';
import Users from '../db/models/users';
import { Op } from 'sequelize';

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
  static async createCard(userId, cardData, cardOrder) {
    const card = await Cards.create({ userId, ...cardData, cardOrder });
    return card;
  }

  // 카드 개별 조회
  static async getCard(cardId) {
    const card = await Cards.findOne({ where: { cardId, deletedAt: null } });
    return card;
  }

  // 카드 전체 조회
  static async getAllCard(columnId) {
    const card = await Cards.findAll({ where: { columnId } });
    return card;
  }

  // 카드 유무 조회
  static async existCard(cardId) {
    const existCard = await Cards.findOne({ where: { cardId } });
    return existCard;
  }

  // 카드 수정
  static async updateCard(
    cardId,
    cardName,
    cardColor,
    cardContent,
    cardOrder,
    columnId,
  ) {
    const updateCard = await Cards.update(
      {
        cardName,
        cardColor,
        cardContent,
        cardOrder,
        columnId,
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

  // 카드 순서 UP
  static async cardUp(cardId) {
    console.log('test : cardId', cardId);
    const card = await Cards.findByPk(cardId);
    console.log(card);
    const currentOrder = card.cardOrder;
    const targetCard = await Cards.findAll({
      where: { cardOrder: { [Op.gt]: currentOrder } },
      order: [['cardOrder']],
      limit: 1,
    });

    const targetOrder = targetCard[0].cardOrder;
    const targetId = targetCard[0].cardId;

    await Cards.update({ cardOrder: targetOrder }, { where: { cardId } });
    const result = await Cards.update(
      { cardOrder: currentOrder },
      { where: { cardId: targetId } },
    );
    return result;
  }

  // 카드 순서 DOWN
  static async cardDown(cardId) {
    console.log('test : cardId', cardId);
    const card = await Cards.findByPk(cardId);
    const cardOrder = card.cardOrder;
    const targetCard = await Cards.findAll({
      where: {
        cardOrder: { [Op.lt]: cardOrder },
      },
      order: [['cardOrder', 'DESC']],
      limit: 1,
    });
    const targetOrder = targetCard[0].cardOrder;
    const targetId = targetCard[0].cardId;

    await Cards.update({ cardOrder }, { where: { cardId: targetId } });

    const result = await Cards.update(
      { cardOrder: targetOrder },
      { where: { cardId } },
    );
    return result;
  }
  // 작업자 할당
  static async addWorker(userId, cardId) {
    const addWorker = await Workers.create({ userId, cardId });
    return addWorker;
  }

  // 작업자 전체 조회
  static async getWorker(cardId) {
    const getWorker = await Workers.findAll({
      where: { cardId },
      include: {
        model: Users,
        attributes: ['email', 'nickname', 'sentence'],
      },
    });
    return getWorker;
  }

  // 특정 작업자 조회
  static async getOneWorker(userId, cardId) {
    const getOneWorker = await Workers.findOne({
      where: { cardId, userId },
    });
    return getOneWorker;
  }
}

export default CardsRepository;
