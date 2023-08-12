import sequelize from './sequelize.js';
import Access from './models/access.js';
import Boards from './models/boards.js';
import Cards from './models/cards.js';
import Columns from './models/columns.js';
import Comments from './models/comments.js';
import Relations from './relations/index.js';
import Users from './models/users.js';
import Workers from './models/workers.js';
Object.values(Relations).forEach(relationsFunction => {
  relationsFunction();
});

export { sequelize, Users, Boards, Access, Columns, Cards, Comments, Workers };
