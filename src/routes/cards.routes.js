import { Router } from 'express';
import CardsController from '../controllers/cards.controller';
const router = Router();

// 카드 생성
router.post('/cards', CardsController.createCard);

export default router;
