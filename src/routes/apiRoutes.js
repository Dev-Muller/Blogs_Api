const express = require('express');

const { findOneUser, createUser, getAllUsers, getUserById } = require('../controllers/user');

const {
  validateFields,
  invalidFields,
  displayNameLenght,
  validEmail,
  passwordLenght,
  validateToken,
} = require('../middlewares/user');

const apiRoutes = express.Router();

apiRoutes.post('/login', validateFields, invalidFields, findOneUser);

apiRoutes.post('/user', displayNameLenght, validEmail, passwordLenght, createUser);

apiRoutes.get('/user', validateToken, getAllUsers);

apiRoutes.get('/user/:id', validateToken, getUserById);

module.exports = apiRoutes;