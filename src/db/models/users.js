import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Users extends Model {}

Users.init(
  {
    userId: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    sentence: DataTypes.STRING,
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
    modelName: 'Users',
  },
);

export default Users;
