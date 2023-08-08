import { Router } from 'express';
import ColumnsController from '../controllers/columns.controller';

const router = Router();

router.post('/columns', ColumnsController.createColumn);

router.get('/columns', ColumnsController.getColumns);

router.patch('/columns/:columnId', ColumnsController.updateColumn);

router.delete('/columns/:columnId', ColumnsController.deleteColumn);

router.patch('/columns/:columnId/up', ColumnsController.moveColumnUp);

router.patch('/columns/:columnId/down', ColumnsController.moveColumnDown);

export default router;
