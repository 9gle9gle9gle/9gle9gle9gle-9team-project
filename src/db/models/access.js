import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Access extends Model {}

Access.init(
  {
    userId: DataTypes.BIGINT,
    boardId: DataTypes.BIGINT,
  },
  {
    sequelize,
    modelName: 'Access',
  },
);

export default Access;
