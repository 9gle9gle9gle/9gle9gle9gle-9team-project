import dotenv from 'dotenv';
dotenv.config();

class Env {
  constructor() {
    this._username = process.env.MYSQL_USERNAME;
    this._password = process.env.MYSQL_PASSWORD;
    this._database = process.env.MYSQL_DATABASE;
    this._mysqlhost = process.env.MYSQL_HOST;
    this._mysqlport = process.env.MYSQL_PORT;
    this._dialect = 'mysql';
    this._host = process.env.HOST;
    this._port = process.env.PORT;
  }

  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
  get database() {
    return this._database;
  }
  get mysqlhost() {
    return this._mysqlhost;
  }
  get mysqlport() {
    return this._mysqlport;
  }
  get dialect() {
    return this._dialect;
  }
  get host() {
    return this._host;
  }
  get port() {
    return this._port;
  }
}

export default Env;
