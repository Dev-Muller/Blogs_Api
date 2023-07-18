const { verifyToken } = require('../auth/authfunctions');

const validateFields = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

const invalidFields = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }
  next();
};

const displayNameLenght = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  next();
};

const passwordLenght = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  next();
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const newToken = token.replace('Bearer ', '');
    if (!newToken) {
    return res.status(401).json({
        message: 'Token not found',
      });
    }
    const verify = await verifyToken(newToken);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateFields, invalidFields, displayNameLenght, validEmail, passwordLenght, validateToken };