import Comments from '../models/comments.js';
import Cards from '../models/cards.js';
import Users from '../models/users.js';

export default () => {
  Comments.belongsTo(Cards, {
    targetKey: 'cardId',
    foreignKey: 'cardId',
  });
  Comments.belongsTo(Users, {
    targetKey: 'userId',
    foreignKey: 'userId',
  });
};
