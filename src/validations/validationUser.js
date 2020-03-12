const { check } = require('express-validator');

//Se crea la ruta de validación para los campos del modelo User
const ValidationsUser = {
    withPassword: [
        check('name', "Ingresa tu nombre").not().isEmpty(),
        check('username', "Ingresa tu nombre de usuario").not().isEmpty(),
        check('email', "Ingresa un mail válido").isEmail(),
        check('password', "El password debe tener un mínimo de 6 caracteres").isLength({min: 6})
    ],
    withoutPassword: [
        check('name', "Ingresa tu nombre").not().isEmpty(),
        check('email', "Ingresa un mail válido").isEmail()
    ],
    password: [
        check('password', "El password debe tener un mínimo de 6 caracteres").isLength({min: 6}),
        check('password_confirm', "El password debe tener un mínimo de 6 caracteres").isLength({min: 6})
    ]
}

module.exports = ValidationsUser;