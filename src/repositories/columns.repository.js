import Columns from '../db/models/columns';
import { Op } from 'sequelize';
import Access from '../db/models/access';
import sequelize from '../db/sequelize';

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

  async moveColumnUp(columnId) {
    const t = await sequelize.transaction();
    try {
      const currentColumn = await Columns.findByPk(columnId, {
        transaction: t,
      });
      const currentOrder = currentColumn.columnOrder;

      const targetColumn = await Columns.findOne(
        {
          where: { [Op.gt]: currentOrder },
        },
        { transaction: t },
      );
      const targetOrder = targetColumn.columnOrder;
      const targetId = targetColumn.columnId;

      await Columns.update(
        { columnOrder: targetOrder },
        { where: { columnId } },
        { transaction: t },
      );
      await Columns.update(
        { columnOrder: currentOrder },
        { where: { columnId: targetId } },
        { transaction: t },
      );

      await t.commit();
      return 1;
    } catch (err) {
      console.log(err);
      await t.rollback();
      return 0;
    }
  }

  async moveColumnDown(columnId) {
    const t = await sequelize.transaction();
    try {
      const currentColumn = await Columns.findByPk(columnId, {
        transaction: t,
      });
      const currentOrder = currentColumn.columnOrder;
      const columnOrder = currentOrder - 1;
      const targetColumn = await Columns.findOne(
        {
          where: { columnOrder },
        },
        { transaction: t },
      );
      const targetId = targetColumn.columnId;

      await Columns.update(
        { columnOrder: columnOrder },
        { where: { columnId } },
        { transaction: t },
      );
      await Columns.update(
        { columnOrder: currentOrder },
        { where: { columnId: targetId } },
        { transaction: t },
      );

      await t.commit();
      return 1;
    } catch (err) {
      console.log(err);
      await t.rollback();
      return 0;
    }
  }

  async getUserId(userId, boardId) {
    const getUserId = await Access.findOne({ where: { userId, boardId } });
    return getUserId;
  }
}

export default new ColumnsRepository();
