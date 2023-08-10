import Cards from '../db/models/cards';
import Columns from '../db/models/columns';
import Access from '../db/models/access';
import sequelize from '../db/sequelize';
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
    const card = await Cards.findAll({ where: { columnId, deletedAt: null } });
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

  // 카드 순서 UP
  static async cardUp(cardId) {
    const t = await sequelize.transaction();
    try {
      const card = await Cards.findByPk(cardId, { transaction: t });
      const currentOrder = card.cardOrder;
      const targetCard = await Cards.findAll(
        {
          where: { cardOrder: { [Op.gt]: currentOrder } },
          order: [['cardOrder']],
          limit: 1,
        },
        { transaction: t },
      );

      const targetOrder = targetCard[0].cardOrder;
      const targetId = targetCard[0].cardId;

      await Cards.update(
        { cardOrder: targetOrder },
        { where: { cardId } },
        { transaction: t },
      );
      await Cards.update(
        { cardOrder: currentOrder },
        { where: { cardId: targetId } },
        { transaction: t },
      );

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }

  // 카드 순서 DOWN
  static async cardDown(cardId) {
    const t = await sequelize.transaction();
    try {
      const card = await Cards.findByPk(cardId, { transaction: t });
      const cardOrder = card.cardOrder;
      const targetCard = await Cards.findAll(
        {
          where: {
            cardOrder: { [Op.lt]: cardOrder },
          },
          order: [['cardOrder', 'DESC']],
          limit: 1,
        },
        { transaction: t },
      );

      const targetOrder = targetCard[0].cardOrder;
      const targetId = targetCard[0].cardId;

      await Cards.update(
        { cardOrder },
        { where: { cardId: targetId } },
        { transaction: t },
      );

      await Cards.update(
        { cardOrder: targetOrder },
        { where: { cardId } },
        { transaction: t },
      );

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }
}

export default CardsRepository;
