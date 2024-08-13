const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    console.log(`Received token: ${token}`); // Log the received token

    if (!token) {
      console.log('No token provided'); // Log when no token is provided
      return res.status(400).json({ message: 'You have no token!' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('Token verified successfully:', req.user); // Log verified token data
    } catch (err) {
      console.log('Invalid token error:', err.message); // Log error when token verification fails
      return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log('Signing token for payload:', payload); // Log the payload for signing

    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    console.log('Signed token:', token); // Log the signed token

    return token;
  },
};