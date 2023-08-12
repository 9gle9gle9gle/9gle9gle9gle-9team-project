import Users from '../models/users.js';
import Access from '../models/access.js';
import Cards from '../models/cards.js';
import Comments from '../models/comments.js';
import Workers from '../models/workers.js';

export default () => {
  Users.hasMany(Access, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  }),
    Users.hasMany(Cards, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    }),
    Users.hasMany(Comments, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    }),
    Users.hasMany(Workers, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
};
