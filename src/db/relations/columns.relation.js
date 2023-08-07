import Columns from '../models/columns.js';
import Boards from '../models/boards.js';
import Cards from '../models/cards.js';

export default () => {
  Columns.hasMany(Cards, {
    sourceKey: 'columnId',
    foreignKey: 'columnId',
  });
  Cards.belongsTo(Boards, {
    targetKey: 'boardId',
    foreignKey: 'boardId',
  });
};
