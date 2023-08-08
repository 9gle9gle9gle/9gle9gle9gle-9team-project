import express from 'express';
import UsersController from '../controllers/users.controller';
import validator from '../middlewares/validation.js';


const router = express.Router();
const usersController = new UsersController();

// 회원가입 기능 
router.post('/signup', validator.createUser, usersController.signup);

// // 로그인 기능
// router.post('/login', usersController.loginUser);

// // 회원정보 수정
// router.put('/users/:userId', validator.updateUser, usersController.updateUser);

// // 회원정보 삭제
// router.delete('/users/:userId', usersController.deleteUser);

export default router;