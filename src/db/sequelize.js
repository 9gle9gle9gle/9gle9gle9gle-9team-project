import { Sequelize } from 'sequelize';
import Env from '../env.js';
const env = new Env();

const sequelize = new Sequelize({
  database: env.database,
  username: env.username,
  port: env.mysqlport,
  password: env.password,
  host: env.mysqlhost,
  dialect: env.dialect,
  logging: false
});

export default sequelize;
