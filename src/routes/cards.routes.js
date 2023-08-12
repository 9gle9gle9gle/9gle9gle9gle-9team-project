import { Router } from 'express';
import CardsController from '../controllers/cards.controller';
import authmiddleware from '../middlewares/authmiddlewares';
const router = Router();

// 카드 생성
router.post('/cards', authmiddleware, CardsController.createCard);

//  카드 개별 조회
router.get('/cards/:cardId', authmiddleware, CardsController.getCard);

// 카드 수정
router.patch('/cards/:cardId', authmiddleware, CardsController.updateCard);

// 카드 삭제
router.delete('/cards/:cardId', authmiddleware, CardsController.deleteCard);

// 카드 순서 UP
router.patch('/cards/:cardId/up', authmiddleware, CardsController.cardUp);

// 카드 순서 DOWN
router.patch('/cards/:cardId/down', authmiddleware, CardsController.cardDown);

// 작업자 추가
router.post(
  '/boards/:boardId/cards/:cardId/workers',
  authmiddleware,
  CardsController.addWorker,
);
// 작업자 조회
router.get(
  '/boards/:boardId/cards/:cardId/workers',
  authmiddleware,
  CardsController.getWorker,
);

export default router;
