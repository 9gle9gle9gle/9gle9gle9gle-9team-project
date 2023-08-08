import ColumnsRepository from '../repositories/columns.repository';

const columnsService = {
  async createColumn(boardId, columnName, columnOrder) {
    try {
      const newColumn = await ColumnsRepository.createColumn(
        boardId,
        columnName,
        columnOrder,
      );
      return newColumn;
    } catch (error) {
      throw new Error('컬럼 생성 중 오류가 발생했습니다.');
    }
  },

  async getColumns(userId, boardId) {
    try {
      const columns = await ColumnsRepository.getColumns(userId, boardId);
      return columns;
    } catch (error) {
      throw new Error('컬럼 조회 중 오류가 발생했습니다.');
    }
  },

  async updateColumn(columnId, columnName) {
    try {
      const updatedColumn = await ColumnsRepository.updateColumn(
        columnId,
        columnName,
      );
      if (!updatedColumn) {
        throw new Error('컬럼을 찾을 수 없습니다.');
      }
      return updatedColumn;
    } catch (error) {
      throw new Error('컬럼 수정 중 오류가 발생했습니다.');
    }
  },

  async deleteColumn(columnId, deletedAt) {
    try {
      const rowCount = await ColumnsRepository.deleteColumn(
        columnId,
        deletedAt,
      );
      if (rowCount === 0) {
        throw new Error('컬럼을 찾을 수 없거나 이미 삭제되었습니다.');
      }
    } catch (error) {
      throw new Error('컬럼 삭제 중 오류가 발생했습니다.');
    }
  },

  async moveColumnUp(columnId) {
    try {
      const updatedColumn = await ColumnsRepository.moveColumnUp(columnId);
      if (!updatedColumn) {
        throw new Error('컬럼을 찾을 수 없습니다.');
      }
      return updatedColumn;
    } catch (error) {
      throw new Error('컬럼 순서 변경 중 오류가 발생했습니다.');
    }
  },

  async moveColumnDown(columnId) {
    try {
      const updatedColumn = await ColumnsRepository.moveColumnDown(columnId);
      if (!updatedColumn) {
        throw new Error('컬럼을 찾을 수 없습니다.');
      }
      return updatedColumn;
    } catch (error) {
      throw new Error('컬럼 순서 변경 중 오류가 발생했습니다.');
    }
  },
};

export default columnsService;
