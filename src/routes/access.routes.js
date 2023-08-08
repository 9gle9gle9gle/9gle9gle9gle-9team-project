import { Router } from 'express';
import AccessController from '../controllers/access.controller';

const router = Router();
const accessController = new AccessController();

router.post('/accesses', accessController.giveAccess);
router.get('/accesses', accessController.showAccess);
router.delete('/accesses', accessController.removeAccess);

export default router;
