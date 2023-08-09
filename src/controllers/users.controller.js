import UserService from '../services/users.service';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // 회원가입 기능
  signup = async (req, res, next) => {
    const { email, password, confirm, nickname } = req.body;
    const signup = await this.userService.createUser(email, password, nickname);
    // 삼항 연산자로 처리
    signup.status === 201
      ? res.status(201).json({ message: '회원 가입에 성공하였습니다.' })
      : res.status(400).json({ message: signup.errorMessage });
  };

  // 로그인
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.loginUser(email, password);

      res.header('authorization', `Bearer ${token}`);
      res.status(200).json({ message: '로그인에 성공하였습니다.' });
    } catch (error) {
      res.status(401).json({ message: '로그인에 실패하였습니다.' });
    }
  };

  // 로그아웃
  logoutUser = async (req, res, next) => {
    try {
      res
        .clearCookie('Authorization')
        .json({ message: '로그아웃 성공하였습니다.' });
    } catch (err) {
      return res.status(400).json({ message: '로그아웃 실패하였습니다.' });
    }
  };

  // 회원정보 수정
  updateUser = async (req, res) => {
    try {
      const { nickname, sentence } = req.body;

      const userId = res.locals.user;
      await this.userService.updateUser(userId, nickname, sentence);
      return res
        .status(200)
        .json({ message: '회원 정보 수정에 성공하였습니다.' });
    } catch (error) {
      console.error('Update Error:', error);
      return res
        .status(400)
        .json({ message: '회원 정보 수정에 실패하였습니다.' });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { deletedAt } = req.body;
      const userId = res.locals.user;
      await this.userService.deleteUser(userId, deletedAt);
      return res
        .status(200)
        .json({ message: '회원 정보 탈퇴에 성공하였습니다.' });
    } catch (error) {
      console.error('Delete Error:', error);
      return res
        .status(400)
        .json({ message: '회원 정보 탈퇴에 실패하였습니다.' });
    }
  };
}

export default UserController;
