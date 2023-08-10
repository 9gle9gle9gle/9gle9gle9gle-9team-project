import express from 'express';
import UsersController from '../controllers/users.controller';
import validator from '../middlewares/validation.js';
import authmiddleware from '../middlewares/authmiddlewares';

const router = express.Router();
const usersController = new UsersController();

// 회원가입 기능
router.post('/signup', validator.createUser, usersController.signup);

// 로그인 기능
router.post('/login', usersController.loginUser);

// 로그아웃
router.post('/logout', usersController.logoutUser);

// // 회원정보 수정
router.patch('/profile', authmiddleware, usersController.updateUser);

// // 회원정보 삭제
router.delete('/signout', authmiddleware, usersController.deleteUser);

export default router;
