const Router = require('express');

const routes = Router();

const HomeController = require('./controllers/HomeControllers');

//HOME
routes.get('/', HomeController.home)

module.exports = routes;