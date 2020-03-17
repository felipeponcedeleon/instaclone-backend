const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

//Importar modelo para carga
const User = require('../models/User');
const Photo = require('../models/Photo');

const connection = new Sequelize(ConfigDB);

//Inicializar los modelos
User.init(connection);
Photo.init(connection);

//Asociaciones
User.associations(connection.models);
Photo.associations(connection.models);

module.exports = connection;