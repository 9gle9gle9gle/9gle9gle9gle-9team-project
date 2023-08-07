import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Comments extends Model {}

Comments.init(
  {
    commentId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    cardId: DataTypes.BIGINT,
    content: DataTypes.STRING,
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
    modelName: 'Comments',
  },
);

export default Comments;
