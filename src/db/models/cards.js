import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Cards extends Model {}

Cards.init(
  {
    cardId: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    columnId: DataTypes.BIGINT,
    cardName: DataTypes.STRING,
    cardContent: DataTypes.STRING,
    cardColor: { type: DataTypes.ENUM, values: ['0', '1', '2', '3', '4', '5'] },
    cardOrder: DataTypes.BIGINT,
    endAt: {
      type: DataTypes.DATE,
    },
    userId: DataTypes.BIGINT,
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
    modelName: 'Cards',
  },
);

export default Cards;
