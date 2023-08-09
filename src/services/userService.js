const { PostCategory, BlogPost, User } = require('../models');

const findOne = (email, password) => User.findOne({ where: { email, password } });

const createUser = (displayName, email, password, image) => User
  .create({ displayName, email, password, image });

const getByEmail = (email) => User.findOne({ where: { email } });

const getAllUsers = async () => User.findAll({ attributes: { exclude: 'password' } });

const getUserById = async (id) => User.findByPk(id, { attributes: { exclude: 'password' } });

const deleteUser = async (id) => {
  const findAllUserPosts = await BlogPost.findAll({ where: { userId: id } });
  await findAllUserPosts.forEach((post) => {
    PostCategory.destroy({ where: { postId: post.id } });
  });
  await BlogPost.destroy({ where: { userId: id } });
  await User.destroy({ where: { id } });
};

module.exports = {
  findOne,
  createUser,
  getByEmail,
  getAllUsers,
  getUserById,
  deleteUser,
};