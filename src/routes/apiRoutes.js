const express = require('express');

const { findOneUser, createUser, getAllUsers } = require('../controllers/user');

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

module.exports = apiRoutes;