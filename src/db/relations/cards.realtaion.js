import Cards from '../models/cards.js';
import Comments from '../models/comments.js';
import Users from '../models/users.js';
import Columns from '../models/columns.js';
import Workers from '../models/workers.js';

export default () => {
  Cards.hasMany(Comments, {
    sourceKey: 'cardId',
    foreignKey: 'cardId',
  });
  Cards.belongsTo(Users, {
    targetKey: 'userId',
    foreignKey: 'userId',
  });
  Cards.belongsTo(Columns, {
    targetKey: 'columnId',
    foreignKey: 'columnId',
  });
  Cards.hasMany(Workers, {
    sourceKey: 'cardId',
    foreignKey: 'cardId',
  });
};
