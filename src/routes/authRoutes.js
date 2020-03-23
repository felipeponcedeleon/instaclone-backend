const { Router } = require('express');
const routes = Router();

const AuthController = require('../controllers/AuthController');

const ValidationsAuth = require('../validations/validationAuth');

routes.post('/', ValidationsAuth.login, AuthController.login);

module.exports = routes;