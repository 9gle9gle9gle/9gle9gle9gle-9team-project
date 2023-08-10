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

      const targetColumn = await Columns.findAll(
        {
          where: {
            columnOrder: { [Op.gt]: currentOrder },
          },
          order: [['columnOrder']],
          limit: 1,
        },
        { transaction: t },
      );
      const targetOrder = targetColumn[0].columnOrder;
      const targetId = targetColumn[0].columnId;

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

      const targetColumn = await Columns.findAll(
        {
          where: {
            columnOrder: { [Op.lt]: currentOrder },
          },
          order: [['columnOrder', 'DESC']],
          limit: 1,
        },
        { transaction: t },
      );
      const columnOrder = targetColumn[0].columnOrder;
      const targetId = targetColumn[0].columnId;

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
