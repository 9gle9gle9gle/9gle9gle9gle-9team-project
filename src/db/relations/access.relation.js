import Access from '../models/access.js';
import Boards from '../models/boards.js';
import Users from '../models/users.js';

export default () => {
  Access.belongsTo(Boards, {
    targetKey: 'boardId',
    foreignKey: 'boardId',
  });
  Access.belongsTo(Users, {
    targetKey: 'userId',
    foreignKey: 'userId',
  });
};
