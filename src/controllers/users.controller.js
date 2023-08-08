import UserService from '../services/users.service';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // 회원가입 기능
  signup = async (req, res, next) => {
      const { email, password, confirm, nickname } = req.body;
      const signup = await this.userService.createUser(
        email,
        password,
        nickname
      );
      console.log('Look here:', signup);
      // 삼항 연산자로 처리 
      (signup.status === 201) ? res.status(201).json({message: '회원 가입에 성공하였습니다.'})
                               : res.status(400).json({message: signup.errorMessage});
    } 
  };


export default UserController;


  // // 로그인
  // loginUser = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const token = await this.userService.loginUser(email, password);
  //     await res.cookie('authorization', `Bearer ${token}`); // 토큰 수정

  //     return res.status(200).json({ message: '로그인이 완료되었습니다.' });
  //   } catch (error) {
  //     console.error('Login Error:', error);
  //     res.status(401).json({ message: '로그인이 실패하였습니다.' });
  //   }
  // };

  // // 회원정보 수정
  // updateUser = async (req, res) => {
  //   try {
  //     const { email, password, nickname, address, role, phone } = req.body;
  //     const { userId } = req.params;
  //     await this.userService.updateUser(userId, email, password, nickname, address, role, phone);

  //     return res.status(200).json({ message: '회원정보 수정이 완료되었습니다.' });
  //   } catch (error) {
  //     console.error('Update Error:', error);
  //     res.status(500).json({ errorMessage: '회원정보 수정이 실패했습니다.' });
  //   }
  // };

  // // 회원정보 삭제
  // deleteUser = async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     await this.userService.deleteUser(userId);

  //     return res.status(200).json({ message: '회원정보 삭제가 정상적으로 처리되었습니다.' });
  //   } catch (error) {
  //     console.error('Delete Error:', error);
  //     res.status(500).json({ errorMessage: '회원정보 삭제가 실패했습니다.' });
  //   }
  // };