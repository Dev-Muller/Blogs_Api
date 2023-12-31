const express = require('express');

const {
  findOneUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../controllers/user');

const { createCategory, getAllCategories } = require('../controllers/category');

const { createPost,
  findAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
} = require('../controllers/postCategory');

const {
  validateFields,
  invalidFields,
  displayNameLenght,
  validEmail,
  passwordLenght,
  validateToken,
  validateCategoryName,
} = require('../middlewares/user');

const {
  validatePostContent,
  validatePostTitleAndContent,
  validateUserPost,
} = require('../middlewares/posts');

const apiRoutes = express.Router();

apiRoutes.post('/login', validateFields, invalidFields, findOneUser);

apiRoutes.post('/user', displayNameLenght, validEmail, passwordLenght, createUser);

apiRoutes.get('/user', validateToken, getAllUsers);

apiRoutes.get('/user/:id', validateToken, getUserById);

apiRoutes.post('/categories', validateToken, validateCategoryName, createCategory);

apiRoutes.get('/categories', validateToken, getAllCategories);

apiRoutes.post('/post', validateToken, validatePostContent, createPost);

apiRoutes.get('/post', validateToken, findAllPosts);

apiRoutes.get('/post/search', validateToken, searchPost);

apiRoutes.get('/post/:id', validateToken, getPostById);

apiRoutes.put('/post/:id', validateToken, validatePostTitleAndContent, updatePost);

apiRoutes.delete('/post/:id', validateToken, validateUserPost, deletePost);

apiRoutes.delete('/user/me', validateToken, deleteUser);

module.exports = apiRoutes;