const { createToken } = require('../auth/authfunctions');
const UserService = require('../services/userService');

const findOneUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.findOne(email, password);

    if (!user) {
      return res.status(400).json({
        message: 'Invalid fields',
      });
    }
    const payload = { data: user };
    const token = createToken(payload);
    return res.status(200).json({
      token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const validEmail = await UserService.getByEmail(email);
    
    if (validEmail) {
      return res.status(409).json({
        message: 'User already registered',
      });
    }
    const user = await UserService.createUser(displayName, email, password, image);
    const payload = { data: user };
    const token = createToken(payload);
    return res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { data } = req.user;
  await UserService.deleteUser(data.id);
  return res.status(204).json({});
};

module.exports = {
  findOneUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};