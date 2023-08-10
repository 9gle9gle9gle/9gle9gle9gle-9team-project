import Users from '../db/models/users.js';

class UserRepository {
  async create(userId) {
    return Users.create(userId);
  }

  async findByEmail(email) {
    return Users.findOne({ where: { email, deletedAt: null } });
  }

  async update(userId, nickname, sentence) {
    const users = await Users.update(
      {
        nickname,
        sentence,
      },
      { where: { userId } },
    );

    if (!users) {
      throw new Error('유저를 찾을 수 없습니다.');
    }
    return users;
  }

  async delete(userId, deletedAt) {
    const users = await Users.update({ deletedAt }, { where: { userId } });

    if (!users) {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }
  }
}

export default UserRepository;
