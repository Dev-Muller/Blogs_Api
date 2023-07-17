const express = require('express');

const { findOneUser, createUser } = require('../controllers/user');

const { validateFields,
  invalidFields, displayNameLenght, validEmail, passwordLenght } = require('../middlewares/user');

const apiRoutes = express.Router();

apiRoutes.post('/login', validateFields, invalidFields, findOneUser);

apiRoutes.post('/user', displayNameLenght, validEmail, passwordLenght, createUser);

module.exports = apiRoutes;