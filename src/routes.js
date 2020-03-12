const Router = require('express');

const routes = Router();

const authMiddleware = require('./middleware/auth');

const HomeController = require('./controllers/HomeControllers');
const UserController = require('./controllers/UserControllers');

//Se llama al archivo con la ruta de validación del modelo User
const ValidationsUser = require('./validations/validationUser');

//HOME
routes.get('/', HomeController.home)

//USUARIOS
//Se ocupa ValidatioUser como middleware llamando a la ruta de validación
//withPassword
routes.post('/users', ValidationsUser.withPassword, UserController.store);

routes.get('/users/:username', authMiddleware, UserController.show);

module.exports = routes;