const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

//Importar modelo para carga
const User = require('../models/User');

const connection = new Sequelize(ConfigDB);

User.init(connection);

module.exports = connection;