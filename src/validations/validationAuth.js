const { check } = require('express-validator');

const ValidationAuth = {
    login: [
        check("username", "Ingresa tu usuario").not().isEmpty(),
        check("password", "Ingresa tu password").not().isEmpty()
    ]
}

module.exports = ValidationAuth;