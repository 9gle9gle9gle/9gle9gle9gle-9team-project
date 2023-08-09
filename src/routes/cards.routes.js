import { Router } from 'express';
import CardsController from '../controllers/cards.controller';
const router = Router();

// 카드 생성
router.post('/cards', CardsController.createCard);

//  카드 전체 조회
router.get('/cards', CardsController.getCards);

export default router;
