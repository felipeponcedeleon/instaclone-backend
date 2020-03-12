const Router = require('express');

const routes = Router();

const HomeController = require('./controllers/HomeControllers');
const UserController = require('./controllers/UserControllers');

//Se llama al archivo con la ruta de validación del modelo User
const ValidationsUser = require('./validations/validationUser');

//HOME
routes.get('/', (req, res) => {
    res.json({
        mensaje: 'Desde Home!'
    });
})

//USUARIOS
//Se ocupa ValidatioUser como middleware llamando a la ruta de validación
//withPassword
routes.post('/users', ValidationsUser.withPassword, UserController.store);


module.exports = routes;