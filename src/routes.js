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

//Mandamos el nombre de usuario por url para su consulta
routes.get('/users/:username', authMiddleware, UserController.show);

//Actualizar información de la cuenta (perfil)
routes.put('/users', authMiddleware, ValidationsUser.withoutPassword, UserController.update);

//Cambiar password de la cuenta (perfil)
routes.put('/password-update', authMiddleware, ValidationsUser.password, UserController.updatePassword);

module.exports = routes;