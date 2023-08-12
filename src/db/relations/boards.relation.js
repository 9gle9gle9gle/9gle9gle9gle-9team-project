import Boards from '../models/boards';
import Users from '../models/users';
import Access from '../models/access.js';
import Columns from '../models/columns.js';
import Workers from '../models/workers';

export default () => {
  Boards.hasMany(Columns, {
    sourceKey: 'boardId',
    foreignKey: 'boardId',
  });
  Boards.hasMany(Access, {
    sourceKey: 'boardId',
    foreignKey: 'boardId',
  });
  Boards.belongsTo(Users, {
    targetKey: 'userId',
    foreignKey: 'userId',
  });
};
