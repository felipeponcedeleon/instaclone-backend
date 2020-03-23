const { Router } = require('express');
const routes = Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const UserController = require('../controllers/UserControllers');
const ValidationsUser = require('../validations/validationUser');
const authMiddleware = require('../middleware/auth');


//USUARIOS
//Se ocupa ValidatioUser como middleware llamando a la ruta de validación
//withPassword
routes.post('/', ValidationsUser.withPassword, UserController.store);

//Mandamos el nombre de usuario por url para su consulta
routes.get('/:username', authMiddleware, UserController.show);

//Actualizar información de la cuenta (perfil)
routes.put('/', authMiddleware, ValidationsUser.withoutPassword, UserController.update);

//Cambiar password de la cuenta (perfil)
routes.put('/password-update', authMiddleware, ValidationsUser.password, UserController.updatePassword);

//Actualizar avatar de la cuenta
routes.put('/avatar', authMiddleware, multer(multerConfig).single("file"), UserController.updateAvatar);


module.exports = routes;
