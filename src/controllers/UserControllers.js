const Sequelize = require('sequelize');

//Llamamos al resultado de la validación
const { validationResult }  = require('express-validator');

const User = require('../models/User');

const passwordHash = require('./utils/passwordHash');

module.exports = {

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
        })
        res.json(user);
    }









}