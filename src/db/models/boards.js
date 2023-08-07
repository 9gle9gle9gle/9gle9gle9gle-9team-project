import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Boards extends Model {}

Boards.init(
  {
    boardId: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    userId: DataTypes.BIGINT,
    boardName: DataTypes.STRING,
    boardColor: {
      type: DataTypes.ENUM,
      values: ['0', '1', '2', '3', '4', '5'],
    },
    boardContent: DataTypes.STRING,
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
    modelName: 'Boards',
  },
);

export default Boards;
