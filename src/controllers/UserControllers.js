const Sequelize = require('sequelize');

//Llamamos al resultado de la validación
const { validationResult }  = require('express-validator');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const User = require('../models/User');

const passwordHash = require('./utils/passwordHash');

const passwordCompare = require('./utils/passwordCompare');

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
    },

    async update(req, res) {
        const { name, email, username, phone, bio } = req.body;

        //creamos la constante que contendra los errores
        const errors = validationResult(req);
        
        //Si hay errores entonces responde con un error 400 y se manda un
        //json con el array con los errores
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        //el userId viene en la respuesta de validación del token, es ahí
        //donde cargamos y extraemos userId
        await User.update(
            {
                name,
                email,
                username,
                phone,
                bio
            },
            {
                where: { id: req.userId }
            }
        );

        return res.json({
            message: "Tus datos se actualizaron correctamente"
        });

    },

    async updatePassword(req, res) {
        //Tomamos los datos desde el cuerpo de la petición que son
        //password_old(actual), password (password nuevo) y password_confirm
        const { password_old, password, password_confirm } = req.body;

        //creamos la constante que contendra los errores
        const errors = validationResult(req);
        
        //Si hay errores entonces responde con un error 400 y se manda un
        //json con el array con los errores
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        
        //Buscamos al usuario autenticado por su primary key
        const user = await User.findByPk(req.userId)

        //comparamos el password del que tenemos con el almacenado en la DB
        const passwordResult = await passwordCompare(password_old, user.password);

        //si el password actual y el de la DB no coinciden entonces lanzamos un error
        if(!passwordResult)
            return res.status(400).json({
                message: "El password antiguo no coincide"
            });

        //Comparamos que el nuevo passsword sea igual a la confirmación
        //si no lo es entonces lanzamos un error
        if(password !== password_confirm)
            return res.status(400).json({
                message: "Los password no coinciden"
            });

        //Si el password actual de la db y el password nuevo están Ok entonces
        //entonces hasheamos el nuevo password
        const passwordListo = await passwordHash(password);

        //Actualizamos el registro del usuario con el nuevo password
        await User.update(
            {password: passwordListo},
            {where: { id: req.userId }}
        )

        return res.json({
            message: "Password actualizado"
        })
    },

    async updateAvatar(req, res) {
        //renombramos el campo filename por key
        const { filename: key } = req.file;

        //res.json(req.query);
        
        promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", req.query.key)
        );

        //pasamos filename (key) a la url
        const url = `${process.env.APP_URL}/files/${key}`;
        
        //guardamos el key(nombre) de la imagen que sirve de referencia
        //para luego actualizar la imagen de avatar sin crear una
        //nueva en el servidor
        await User.update(
            {
                key,
                avatar_url: url
            },
            {
                where: { id: req.userId }
            }
        );

        return res.json({ avatar_url: url });
    }

}