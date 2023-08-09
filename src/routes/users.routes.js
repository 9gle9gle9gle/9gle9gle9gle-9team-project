import express from 'express';
import UsersController from '../controllers/users.controller';
import validator from '../middlewares/validation.js';
import authmiddlewares from '../middlewares/authmiddlewares.js';


const router = express.Router();
const usersController = new UsersController();

// 회원가입 기능 
router.post('/signup', validator.createUser, usersController.signup);

// // 로그인 기능
router.post('/login', usersController.loginUser);

// // 회원정보 수정
// router.patch('/profile', authmiddlewares, usersController.updateUser);

// // 회원정보 삭제
// router.delete('/users/:userId', 미들웨어, usersController.deleteUser);

export default router;