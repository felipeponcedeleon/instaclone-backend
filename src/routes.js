const Router = require('express');

const routes = Router();

const HomeController = require('./controllers/HomeControllers');
const UserController = require('./controllers/UserControllers');

//HOME
routes.get('/', (req, res) => {
    res.json({
        mensaje: 'Desde Home!'
    });
})

//USUARIOS
routes.post('/users', UserController.store);


module.exports = routes;