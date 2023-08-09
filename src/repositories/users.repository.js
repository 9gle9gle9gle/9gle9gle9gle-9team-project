// const { Users } = require('../models');
import Users from '../db/models/users.js';

class UserRepository {
  constructor() {
    // Initialize the model here
    this.Users = Users;
  }
  async create(userId) {
    return Users.create(userId);
  }

  async findByEmail(email) {
    return Users.findOne({ where: { email } });
  }

  async update(usersId, UsersData) {
    const Users = await Users.findOne({ where: { usersId } });
    console.log('유저어 : ', Users);

    if (!Users) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    // 사용자 정보 업데이트
    // Users.email = UsersData.email;
    // Users.password = UsersData.password;
    Users.nickname = UsersData.nickname;
    Users.sentence = UsersData.sentence;


    await Users.save();
  }

  async delete(userId) {
    const Users = await Users.findOne({ where: { userId } });

    if (!Users) {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }

    await Users.destroy();
  }
}

export default UserRepository;
