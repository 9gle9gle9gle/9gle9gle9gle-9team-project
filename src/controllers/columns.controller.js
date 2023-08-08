import ColumnsService from '../services/columns.service';

const ColumnsController = {
  async createColumn(req, res) {
    try {
      const { boardId, columnName, columnOrder } = req.body;

      const newColumn = await ColumnsService.createColumn({
        boardId,
        columnName,
        columnOrder,
      });

      res.status(201).json({
        message: '컬럼이 성공적으로 생성되었습니다.',
        column: newColumn,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async getColumns(req, res) {
    try {
      const userId = req.locals.user;
      const { boardId } = req.body;

      const columns = await ColumnsService.getColumns(userId, boardId);

      res.status(200).json({ columns });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async updateColumn(req, res) {
    try {
      const { columnId } = req.params;
      const { columnName } = req.body;

      const updatedColumn = await ColumnsService.updateColumn(
        columnId,
        columnName,
      );

      res.status(200).json({
        message: '컬럼이 성공적으로 수정되었습니다.',
        column: updatedColumn,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async deleteColumn(req, res) {
    try {
      const { columnId } = req.params;
      const { deletedAt } = req.body;

      await ColumnsService.deleteColumn(columnId, deletedAt);

      res.status(200).json({ message: '컬럼이 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async moveColumnUp(req, res) {
    try {
      const { columnId } = req.params;

      const updatedColumn = await ColumnsService.moveColumnUp(columnId);

      res.status(200).json({
        message: '컬럼 순서가 성공적으로 변경되었습니다.',
        column: updatedColumn,
      });
    } catch (error) {
      console.error(error);
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
