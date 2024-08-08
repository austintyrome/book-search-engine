const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    console.log(`Received token: ${token}`);

    if (!token) {
      console.log('No token provided');
      return res.status(400).json({ message: 'You have no token!' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('Token verified successfully:', req.user);
    } catch (err) {
      console.log('Invalid token error:', err.message);
      return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log('Signing token for payload:', payload);

    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    console.log('Signed token:', token);

    return token;
  },
};