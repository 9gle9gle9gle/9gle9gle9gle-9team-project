import bcrypt from 'bcrypt';
import UserRepository from '../repositories/users.repository.js';
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // 회원가입
  createUser = async (email, password, nickname) => {
    try {
      const emailExists = await this.userRepository.findByEmail(email);
      if (emailExists) {
        throw new Error("중복 이메일 검증") 
      } 

    // bcrypt 패스워드 설정
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      nickname
    });
    // 정상적인 데이터를 반환할 떄의 리턴 값과 중복 이메일을 받는 리턴 값으로 코드 작성
    return { status : 201 , data : user };
  } catch (error) {
    console.log("확인용 :", e)
    return { status: 400, errorMessage: '중복 이메일을 사용할 수 없습니다.' };
  }
 
}
}

export default UserService;

//   // 로그인

//   loginUser = async (email, password) => {
//     const user = await this.userRepository.findByEmail(email);
//     const passwordsMatch = await bcrypt.compare(password, user.password);
//     if (!user) {
//       throw new Error('유효한 이메일이 아닙니다.');
//     }
//     if (!passwordsMatch) {
//       throw new Error('유효한 증명이 아닙니다.');
//     }
//     const token = jwt.sign(
//       {
//         userId: user.userId,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: '1h',
//       }
//     );
//     return token;
//   };

//   // 회원정보 수정
//   updateUser = async (userId, email, password, nickname, address, role, phone) => {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await this.userRepository.update(userId, {
//       email,
//       password: hashedPassword,
//       nickname,
//       address,
//       role,
//       phone,
//     });

//     if (role === 'sitter') {
//       const isSitter = await this.sitterRepository.findByUserId(userId);
//       const isGuest = await this.guestRepository.findByUserId(userId);

//       if (isSitter) {
//       } else {
//         if (isGuest) {
//           await this.guestRepository.delete(userId);
//         }
//         await this.sitterRepository.create({
//           UserId: userId,
//           career: '펫시터',
//         });
//       }
//     } else {
//       const isGuest = await this.guestRepository.findByUserId(userId);
//       const isSitter = await this.sitterRepository.findByUserId(userId);

//       if (isGuest) {
//       } else {
//         if (isSitter) {
//           await this.sitterRepository.delete(userId);
//         }
//         await this.guestRepository.create({
//           UserId: userId,
//         });
//       }
//     }
//   };

//   // 회원정보 삭제
//   deleteUser = async userId => {
//     await this.userRepository.delete(userId);
//   };