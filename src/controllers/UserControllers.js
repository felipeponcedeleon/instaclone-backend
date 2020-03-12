const Sequelize = require('sequelize');

//Llamamos al resultado de la validación
const { validationResult }  = require('express-validator');

const User = require('../models/User');

const passwordHash = require('./utils/passwordHash');

const jwt = require('jsonwebtoken');

module.exports = {

    async show (req, res) {
        //Tomamos el parametro de url (username)
        const { username } = req.params;

        //Buscamos el usuario en la DB excluyendo los campos password y updatedAt
        const user = await User.findOne({
            where: { username },
            attributes: { exclude: ["password","updatedAt"] }
        });

        //Si el usuario no existe entonces mandamos de vuelta un error
        if(!user)
            return res.status(404).json({
                message: "Usuario no encontrado"
            })

        return res.json(user);
    },


    async store (req, res) {

        const { name, email, username, password } = req.body;

        //creamos la constante que contendra los errores
        const errors = validationResult(req);
        
        //Si hay errores entonces responde con un error 400 y se manda un
        //json con el array con los errores
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        //Buscamos el usuario por email o username mediante el operador Sequelize.Op.or
        let user = await User.findOne({
            where: {[Sequelize.Op.or]: [{email}, {username}]}
        });

        //Preguntamos si el email y/o el username ya están registrados, de ser así, se devuelve 
        //un error 400 + mensaje
        if(user){
            if(user.email === email) 
                return res.status(400).json({ message: "Este email ya está registrado" });
            if(user.username === username) 
                return res.status(400).json({ message: "Este usuario ya está en uso" });
        }

        //Llamando al metodo y hasheando el password
        const passwordListo = await passwordHash(password);

        user = await User.create({
            name,
            email,
            username,
            password: passwordListo
        });

        //JWT
        //Creamos el cuerpo del token
        const payload = {id: user.id, username: user.username};

        //Encriptando en jwt
        jwt.sign(payload, process.env.SIGNATURE_TOKEN, 
            { expiresIn: 86400 },
            (error, token) => {
                if(error) throw error;
                return res.json({token});
            }
        )

    }


}