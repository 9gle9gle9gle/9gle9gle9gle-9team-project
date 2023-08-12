import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Workers extends Model {}

Workers.init(
  {
    userId: DataTypes.BIGINT,
    cardId: DataTypes.BIGINT,
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
    modelName: 'Workers',
  },
);
Workers.removeAttribute('id');
export default Workers;
