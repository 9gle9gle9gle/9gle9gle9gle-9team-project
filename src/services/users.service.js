import bcrypt from 'bcrypt';
import UserRepository from '../repositories/users.repository.js';
import jwt from 'jsonwebtoken';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // 회원가입
  createUser = async (email, password, nickname) => {
    try {
      const emailExists = await this.userRepository.findByEmail(email);
      if (emailExists) {
        throw new Error('중복 이메일 검증');
      }

      // bcrypt 패스워드 설정
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userRepository.create({
        email,
        password: hashedPassword,
        nickname,
      });
      return { status: 201, data: user };
    } catch (error) {
      return { status: 400, errorMessage: '중복 이메일을 사용할 수 없습니다.' };
    }
  };

  // 로그인
  loginUser = async (email, password) => {
    const user = await this.userRepository.findByEmail(email);
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new Error('이메일 검증');
    }
    if (!passwordsMatch) {
      throw new Error('패스워드 검증');
    }
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
    const nickname = user.nickname;
    return { token, nickname };
  };

  // 회원정보 수정
  updateUser = async (userId, nickname, sentence) => {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await this.userRepository.update(
      userId,
      nickname,
      sentence,
    );
    if (!updateUser) {
      return { status: 400, errorMessage: '회원 정보를 수정할 수 없습니다.' };
    } else return { status: 200, message: '회원 정보를 수정되었습니다.' };
  };

  deleteUser = async (userId, deletedAt) => {
    const deleteUser = await this.userRepository.delete(userId, deletedAt);
    if (!deleteUser) {
      return { status: 400, errorMessage: '회원 정보를 탈퇴할 수 없습니다.' };
    } else return { status: 200, message: '회원 정보가 탈퇴 되었습니다.' };
  };
}

export default UserService;

//   // 회원정보 삭제
//   deleteUser = async userId => {
//     await this.userRepository.delete(userId);
//   };
