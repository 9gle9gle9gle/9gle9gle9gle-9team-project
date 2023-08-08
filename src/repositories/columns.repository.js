import Columns from '../db/models/columns';
import { Op } from 'sequelize';

class ColumnsRepository {
  async createColumn({ boardId, columnName, columnOrder }) {
    return Columns.create({
      boardId,
      columnName,
      columnOrder,
    });
  }
  async getColumns(userId, boardId) {
    return Columns.findAll({
      where: { userId, boardId },
    });
  }

  async updateColumn(columnId, columnName) {
    const [updatedRowCount, updatedColumns] = await Columns.update(
      { columnName },
      { where: { columnId }, returning: true },
    );

    return updatedRowCount === 1 ? updatedColumns[0] : null;
  }

  async deleteColumn(columnId, deletedAt) {
    const rowCount = await Columns.destroy({
      where: { columnId, deletedAt: null }, // deletedAt이 null인 경우에만 삭제
    });

    return rowCount;
  }

  async moveColumnUp(columnId) {
    const currentColumn = await Columns.findByPk(columnId);
    if (!currentColumn) {
      return null;
    }

    const prevColumn = await Columns.findOne({
      where: {
        boardId: currentColumn.boardId,
        columnOrder: {
          [Op.lt]: currentColumn.columnOrder,
        },
      },
      order: [['columnOrder', 'DESC']],
    });

    if (!prevColumn) {
      return currentColumn;
    }

    const tempOrder = currentColumn.columnOrder;
    currentColumn.columnOrder = prevColumn.columnOrder;
    prevColumn.columnOrder = tempOrder;

    const transaction = await Columns.sequelize.transaction();
    try {
      await currentColumn.save({ transaction });
      await prevColumn.save({ transaction });
      await transaction.commit();

      return currentColumn;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async moveColumnDown(columnId) {
    const currentColumn = await Columns.findByPk(columnId);
    if (!currentColumn) {
      return null;
    }

    const nextColumn = await Columns.findOne({
      where: {
        boardId: currentColumn.boardId,
        columnOrder: {
          [Op.gt]: currentColumn.columnOrder,
        },
      },
      order: [['columnOrder', 'ASC']],
    });

    if (!nextColumn) {
      return currentColumn;
    }

    const tempOrder = currentColumn.columnOrder;
    currentColumn.columnOrder = nextColumn.columnOrder;
    nextColumn.columnOrder = tempOrder;

    const transaction = await Columns.sequelize.transaction();
    try {
      await currentColumn.save({ transaction });
      await nextColumn.save({ transaction });
      await transaction.commit();

      return currentColumn;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default new ColumnsRepository();
