import CardsService from '../services/cards.service';

class CardsController {
  // 카드 생성
  static async createCard(req, res) {
    const userId = res.locals.user;
    const {
      cardName,
      cardColor,
      cardContent,
      endAt,
      columnId,
      deletedAt,
      boardId,
    } = req.body;
    const cardData = {
      cardName,
      cardColor,
      cardContent,
      endAt,
      columnId,
      deletedAt,
      boardId,
    };

    const { status, message } = await CardsService.createCard(
      userId,
      cardData,
      boardId,
    );

    return res.status(status).json({ message });
  }

  // 카드 개별 조회
  static async getCard(req, res) {
    const userId = res.locals.user;
    const { cardId } = req.params;
    const { status, message } = await CardsService.getCard(userId, cardId);

    return res.status(status).json({ message });
  }

  // 카드 수정
  static async updateCard(req, res) {
    const { cardId } = req.params;
    const userId = res.locals.user;
    //   const userId = req.locals.user;
    const { cardName, cardColor, cardContent, cardOrder } = req.body;

    const { status, message } = await CardsService.updateCard(
      cardId,
      userId,
      cardName,
      cardColor,
      cardContent,
      cardOrder,
    );

    return res.status(status).json({ message });
  }

  // 카드 삭제
  static async deleteCard(req, res) {
    const { cardId } = req.params;
    const { deletedAt } = req.body;
    const userId = res.locals.user;
    //   const userId = req.locals.user;

    const { status, message } = await CardsService.deleteCard(
      cardId,
      userId,
      deletedAt,
    );

    return res.status(status).json({ message });
  }

  // 카드 순서 UP
  static async cardUp(req, res) {
    const { cardId } = req.params;
    const userId = 1;
    //   const userId = req.locals.user;

    const { status, message } = await CardsService.cardUp(cardId, userId);

    return res.status(status).json({ message });
  }

  // 카드 순서 DOWN
  static async cardDown(req, res) {
    const { cardId } = req.params;
    const userId = 1;
    //   const userId = req.locals.user;

    const { status, message } = await CardsService.cardDown(cardId, userId);

    return res.status(status).json({ message });
  }
}

export default CardsController;
