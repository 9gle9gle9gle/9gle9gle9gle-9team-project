import { Router } from 'express';
import AccessController from '../controllers/access.controller';
import authmiddleware from '../middlewares/authmiddlewares';

const router = Router();
const accessController = new AccessController();

router.post('/accesses', authmiddleware, accessController.giveAccess);
router.get('/accesses', authmiddleware, accessController.showAccess);
router.delete('/accesses', authmiddleware, accessController.removeAccess);

export default router;
