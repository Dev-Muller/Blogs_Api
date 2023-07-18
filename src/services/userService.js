const { User } = require('../models');

const findOne = (email, password) => User.findOne({ where: { email, password } });

const createUser = (displayName, email, password, image) => User
  .create({ displayName, email, password, image });

const getByEmail = (email) => User.findOne({ where: { email } });

const getAllUsers = async () => User.findAll({ attributes: { exclude: 'password' } });

module.exports = {
  findOne,
  createUser,
  getByEmail,
  getAllUsers,
};