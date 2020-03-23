const Router = require('express');

const routes = Router();

const multer = require('multer');
const multerConfig = require('./config/multer');

const authMiddleware = require('./middleware/auth');

const AuthController = require('./controllers/AuthController');
const HomeController = require('./controllers/HomeControllers');
const UserController = require('./controllers/UserControllers');
const PhotoController = require('./controllers/PhotoController');


//Se llama al archivo con la ruta de validación del modelo User
const ValidationsUser = require('./validations/validationUser');

const ValidationsAuth = require('./validations/validationAuth');


/***** Login *****/
routes.post('/auth', ValidationsAuth.login, AuthController.login);



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

//Actualizar avatar de la cuenta
routes.put('/avatar', authMiddleware, multer(multerConfig).single("file"), UserController.updateAvatar);


/***** Photos *****/
//Crear (subir) foto
routes.post('/photos', authMiddleware, multer(multerConfig).single('file'), PhotoController.store);

//mostrar la/las foto/s
routes.get('/photos/:id', authMiddleware, PhotoController.show);

routes.delete('/photos/:id', authMiddleware, PhotoController.destroy)


module.exports = routes;