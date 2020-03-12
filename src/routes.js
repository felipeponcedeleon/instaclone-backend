const Router = require('express');

const routes = Router();

//HOME
routes.get('/', (req, res) => {
    res.json({
        mensaje: 'Desde Home!'
    });
})

//USUARIOS
routes.post('/users', (req, res) => {
    res.json({
        mensaje: 'Desde users'
    });
});


module.exports = routes;