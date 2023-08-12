import Cards from '../models/cards.js';
import Users from '../models/users.js';
import Workers from '../models/workers.js';

export default () => {
  Workers.belongsTo(Cards, {
    targetKey: 'cardId',
    foreignKey: 'cardId',
  });
  Workers.belongsTo(Users, {
    targetKey: 'userId',
    foreignKey: 'userId',
  });
};
