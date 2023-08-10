import { Router } from 'express';
import CardsController from '../controllers/cards.controller';
const router = Router();

// 카드 생성
router.post('/cards', CardsController.createCard);

//  카드 전체 조회
router.get('/cards', CardsController.getCards);

// 카드 수정
router.patch('/cards/:cardId', CardsController.updateCard);

// 카드 삭제
router.delete('/cards/:cardId', CardsController.deleteCard);

// 카드 순서 UP
router.patch('/cards/:cardId/up', CardsController.cardUp);

// 카드 순서 DOWN
router.patch('/cards/:cardId/down', CardsController.cardDown);

export default router;
