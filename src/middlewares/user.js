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

module.exports = { validateFields, invalidFields };