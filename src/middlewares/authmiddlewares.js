// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../constants';
// import Users from '../db';

// const authmiddlewares = async (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     console.log("여기를 봐주어어ㅓ어어어 : ", token)
//     if (!token) {
//       return res.status(401).json({ message: 'authorization error' });
//     }

//     const decodedToken = jwt.verify(token, JWT_SECRET);
//     const userId = decodedToken.id;

//     const user = await Users.findOne({ where: { id: userId }, attributes: ['email'] });
//     if (!user) {
//       return res.status(404).json({ message: 'user not found' });
//     }
//     req.user = { id: user.id, email: user.email };
//     res.locals.user = user;

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Internal Server error',
//     });
//   }
// };


// export default authmiddlewares;