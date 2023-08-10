import ColumnsController from '../controllers/columns.controller';
import authmiddleware from '../middlewares/authmiddlewares';
import Router from 'express';

const router = Router();

router.post('/columns', authmiddleware, ColumnsController.createColumn);

router.get('/columns', authmiddleware, ColumnsController.getColumns);

router.patch(
  '/columns/:columnId',
  authmiddleware,
  ColumnsController.updateColumn,
);

router.delete(
  '/columns/:columnId',
  authmiddleware,
  ColumnsController.deleteColumn,
);

router.patch(
  '/columns/:columnId/up',
  authmiddleware,
  ColumnsController.moveColumnUp,
);

router.patch(
  '/columns/:columnId/down',
  authmiddleware,
  ColumnsController.moveColumnDown,
);

export default router;
