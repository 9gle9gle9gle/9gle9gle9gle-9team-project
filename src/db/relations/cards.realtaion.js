import Cards from '../models/cards.js';
import Comments from '../models/comments.js';
import Users from '../models/users.js';
import Columns from '../models/columns.js';

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
};
