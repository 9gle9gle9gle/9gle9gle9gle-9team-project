import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Columns extends Model {}

Columns.init(
  {
    columnId: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    boardId: DataTypes.BIGINT,
    columnName: DataTypes.STRING,
    columnOrder: DataTypes.BIGINT,
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Columns',
  },
);

export default Columns;
