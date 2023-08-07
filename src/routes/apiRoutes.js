const express = require('express');

const { findOneUser, createUser, getAllUsers, getUserById } = require('../controllers/user');

const { createCategory, getAllCategories } = require('../controllers/category');

const { createPost } = require('../controllers/postCategory');

const {
  validateFields,
  invalidFields,
  displayNameLenght,
  validEmail,
  passwordLenght,
  validateToken,
  validateCategoryName,
} = require('../middlewares/user');

const { validatePostContent } = require('../middlewares/posts');

const apiRoutes = express.Router();

apiRoutes.post('/login', validateFields, invalidFields, findOneUser);

apiRoutes.post('/user', displayNameLenght, validEmail, passwordLenght, createUser);

apiRoutes.get('/user', validateToken, getAllUsers);

apiRoutes.get('/user/:id', validateToken, getUserById);

apiRoutes.post('/categories', validateToken, validateCategoryName, createCategory);

apiRoutes.get('/categories', validateToken, getAllCategories);

apiRoutes.post('/post', validateToken, validatePostContent, createPost);

module.exports = apiRoutes;