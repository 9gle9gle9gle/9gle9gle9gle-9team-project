import ColumnsRepository from '../repositories/columns.repository';

const columnsService = {
  async createColumn(userId, boardId, columnName) {
    try {
      if (!boardId || !columnName) {
        throw new Error('잘못된 접근입니다.');
      }
      const getUserId = await ColumnsRepository.getUserId(userId, boardId);
      if (!getUserId) {
        throw new Error('잘못된 접근입니다=>.'); // 수정
      }
      const getColumns = await ColumnsRepository.getColumnsOrder(boardId);
      let columnOrder;
      if (getColumns.length == 0) {
        columnOrder = 1;
      } else {
        columnOrder = getColumns.reverse()[0].columnOrder + 1;
      }

      const newColumn = await ColumnsRepository.createColumn(
        boardId,
        columnName,
        columnOrder,
      );
      return newColumn;
    } catch (error) {
      console.log(error);
      throw new Error('컬럼 생성 중 오류가 발생했습니다.');
    }
  },

  async getColumns(userId, boardId) {
    try {
      if (!boardId) {
        throw new Error('잘못된 접근입니다.');
      }
      const getUserId = await ColumnsRepository.getUserId(userId, boardId);
      if (!getUserId) {
        throw new Error('잘못된 접근입니다=>.'); // 수정
      }
      const columns = await ColumnsRepository.getColumns(boardId);
      return columns;
    } catch (error) {
      console.error(error);
      throw new Error('컬럼 조회 중 오류가 발생했습니다.');
    }
  },

  async updateColumn(userId, boardId, columnId, columnName) {
    try {
      if (!columnId || !columnName) {
        throw new Error('잘못된 접근입니다.');
      }
      const getUserId = await ColumnsRepository.getUserId(userId, boardId);
      if (!getUserId) {
        throw new Error('잘못된 접근입니다=>.'); // 수정
      }
      const updatedColumn = await ColumnsRepository.updateColumn(
        columnId,
        columnName,
      );
      if (!updatedColumn) {
        throw new Error('컬럼을 찾을 수 없습니다.');
      }
      return updatedColumn;
    } catch (error) {
      console.error(error);
      throw new Error('컬럼 수정 중 오류가 발생했습니다.');
    }
  },

  async deleteColumn(userId, boardId, columnId, deletedAt) {
    try {
      if (!columnId || !deletedAt) {
        throw new Error('잘못된 접근입니다.');
      }
      const getUserId = await ColumnsRepository.getUserId(userId, boardId);
      if (!getUserId) {
        throw new Error('잘못된 접근입니다=>.'); // 수정
      }
      const rowCount = await ColumnsRepository.deleteColumn(
        columnId,
        deletedAt,
      );
      if (rowCount === 0) {
        throw new Error('컬럼을 찾을 수 없거나 이미 삭제되었습니다.');
      }
    } catch (error) {
      console.error(error);
      throw new Error('컬럼 삭제 중 오류가 발생했습니다.');
    }
  },

  async moveColumnUp(userId, boardId, columnId) {
    try {
      if (!columnId) {
        throw new Error('잘못된 접근입니다.');
      }
      const getUserId = await ColumnsRepository.getUserId(userId, boardId);
      if (!getUserId) {
        throw new Error('잘못된 접근입니다=>.'); // 수정
      }
      const updatedColumn = await ColumnsRepository.moveColumnUp(columnId);
      if (!updatedColumn) {
        throw new Error('컬럼 순서 변경 중 오류가 발생했습니다.');
      }
      return updatedColumn;
    } catch (error) {
      throw new Error('컬럼 순서 변경 중 오류가 발생했습니다.');
    }
  },

  async moveColumnDown(userId, boardId, columnId) {
    try {
      if (!columnId) {
        throw new Error('잘못된 접근입니다.');
      }
      const getUserId = await ColumnsRepository.getUserId(userId, boardId);
      if (!getUserId) {
        throw new Error('잘못된 접근입니다=>.'); // 수정
      }
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
