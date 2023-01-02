import jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET || '';

const fetchUser = function (req: any, res: any, next: any) {
  //Get the user from the jwt token and add id to req object
  if (!req.header['auth-token']) {
    res.redirect('/login');
  }
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
  try {
    const data: any = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
};

export default fetchUser;
