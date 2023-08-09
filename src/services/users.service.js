import bcrypt from 'bcrypt';
import UserRepository from '../repositories/users.repository.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

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
      // 정상적인 데이터를 반환할 떄의 리턴 값과 중복 이메일을 받는 리턴 값으로 코드 작성
      return { status: 201, data: user };
    } catch (error) {
      // console.log("확인용 :", e)
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
      JWT_SECRET,
      // JWT_SECRET, // Use imported JWT_SECRET
      {
        expiresIn: '1h',
      }
    );
    return token;
  };

  //   // 회원정보 수정
  // updateUser = async (nickname, sentence) => {
  //   // const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await this.userRepository.update(usersId, {
  //     nickname,
  //     sentence
  //   });

  //     }
    
    }


export default UserService;



//   // 회원정보 삭제
//   deleteUser = async userId => {
//     await this.userRepository.delete(userId);
//   };
