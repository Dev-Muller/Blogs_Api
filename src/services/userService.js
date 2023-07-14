const { User } = require('../models');

const findOne = (email, password) => User.findOne({ where: { email, password } });

module.exports = {
  findOne,
};