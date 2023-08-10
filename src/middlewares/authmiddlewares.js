const jwt = require('jsonwebtoken');

async function authmiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res
        .status(403)
        .json({ errorMessage: '권한이 존재하지 않습니다.' });
    }
    const [authType, authToken] = (token ?? '').split(' ');
    console.log(authToken);
    if (!authToken || authType !== 'Bearer') {
      return res.status(401).send({
        errorMessage: '로그인 후 이용 가능한 기능입니다.',
      });
    }

    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);

    res.locals.user = userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
}

export default authmiddleware;
