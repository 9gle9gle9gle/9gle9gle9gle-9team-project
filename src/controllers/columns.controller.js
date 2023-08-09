import ColumnsService from '../services/columns.service';

const ColumnsController = {
  async createColumn(req, res) {
    try {
      const userId = 1;
      const { boardId, columnName, columnOrder } = req.body;

      const newColumn = await ColumnsService.createColumn(
        userId,
        boardId,
        columnName,
        columnOrder,
      );

      res.status(201).json({
        message: '컬럼이 성공적으로 생성되었습니다.',
        column: newColumn,
      });
    } catch (error) {
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async getColumns(req, res) {
    try {
      const userId = 1;
      const { boardId } = req.body;

      const columns = await ColumnsService.getColumns(userId, boardId);

      res.status(200).json({ columns });
    } catch (error) {
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async updateColumn(req, res) {
    try {
      const userId = 1;
      const { columnId } = req.params;
      const { boardId, columnName } = req.body;

      const updatedColumn = await ColumnsService.updateColumn(
        userId,
        boardId,
        columnId,
        columnName,
      );

      res.status(200).json({
        message: '컬럼이 성공적으로 수정되었습니다.',
        column: updatedColumn,
      });
    } catch (error) {
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async deleteColumn(req, res) {
    try {
      const userId = 1;
      const { columnId } = req.params;
      const { boardId, deletedAt } = req.body;

      await ColumnsService.deleteColumn(userId, boardId, columnId, deletedAt);

      res.status(200).json({ message: '컬럼이 성공적으로 삭제되었습니다.' });
    } catch (error) {
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async moveColumnUp(req, res) {
    try {
      const userId = 1;
      const { columnId } = req.params;
      const { boardId } = req.body;
      const updatedColumn = await ColumnsService.moveColumnUp(
        userId,
        boardId,
        columnId,
      );

      res.status(200).json({
        message: '컬럼 순서가 성공적으로 변경되었습니다.',
        column: updatedColumn,
      });
    } catch (error) {
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async moveColumnDown(req, res) {
    try {
      const { columnId } = req.params;

      const updatedColumn = await ColumnsService.moveColumnDown(columnId);

      res.status(200).json({
        message: '컬럼 순서가 성공적으로 변경되었습니다.',
        column: updatedColumn,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },
};
export default ColumnsController;
