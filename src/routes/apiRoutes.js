const express = require('express');

const { createUser } = require('../controllers/user');

const { validateFields, invalidFields } = require('../middlewares/user');

const apiRoutes = express.Router();

apiRoutes.post('/login', validateFields, invalidFields, createUser);

module.exports = apiRoutes;