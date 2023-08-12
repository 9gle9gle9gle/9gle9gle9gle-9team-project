import Columns from '../db/models/columns';
import { Op } from 'sequelize';
import Access from '../db/models/access';
import Cards from '../db/models/cards';

class ColumnsRepository {
  async createColumn(boardId, columnName, columnOrder) {
    return Columns.create({
      boardId,
      columnName,
      columnOrder,
    });
  }
  async getColumns(boardId) {
    return Columns.findAll({
      where: { boardId, deletedAt: null },
      order: [['columnOrder']],
    });
  }

  async getColumnsOrder(boardId) {
    return Columns.findAll({
      where: { boardId },
      order: [['columnOrder']],
    });
  }

  async updateColumn(columnId, columnName) {
    const updateColumn = await Columns.update(
      { columnName },
      { where: { columnId, deletedAt: null } },
    );

    return updateColumn;
  }

  async deleteColumn(columnId, deletedAt) {
    const rowCount = await Columns.update(
      {
        deletedAt,
      },
      { where: { columnId } },
    );

    return rowCount;
  }

  async deleteCards(columnId, deletedAt) {
    const result = await Cards.update(
      {
        deletedAt,
      },
      { where: { columnId } },
    );

    return result;
  }

  async moveColumnUp(columnId) {
    const currentColumn = await Columns.findByPk(columnId);
    const currentOrder = currentColumn.columnOrder;

    const targetColumn = await Columns.findAll({
      where: {
        columnOrder: { [Op.gt]: currentOrder },
        deletedAt: null,
      },
      order: [['columnOrder']],
      limit: 1,
    });
    const targetOrder = targetColumn[0].columnOrder;
    const targetId = targetColumn[0].columnId;

    await Columns.update({ columnOrder: targetOrder }, { where: { columnId } });
    const result = await Columns.update(
      { columnOrder: currentOrder },
      { where: { columnId: targetId } },
    );
    return result;
  }

  async moveColumnDown(columnId) {
    const currentColumn = await Columns.findByPk(columnId);
    const currentOrder = currentColumn.columnOrder;

    const targetColumn = await Columns.findAll({
      where: {
        columnOrder: { [Op.lt]: currentOrder },
        deletedAt: null,
      },
      order: [['columnOrder', 'DESC']],
      limit: 1,
    });
    const columnOrder = targetColumn[0].columnOrder;
    const targetId = targetColumn[0].columnId;

    await Columns.update({ columnOrder: columnOrder }, { where: { columnId } });
    const result = await Columns.update(
      { columnOrder: currentOrder },
      { where: { columnId: targetId } },
    );

    return result;
  }

  async getUserId(userId, boardId) {
    const getUserId = await Access.findOne({ where: { userId, boardId } });
    return getUserId;
  }
}

export default new ColumnsRepository();
