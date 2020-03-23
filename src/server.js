require('dotenv').config();
require('./database');

const express = require('express');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');

const routes = require('./routes');

const app = express();

const path = require('path');

//Ocupamos json para la comunicación y respuestas
app.use(express.json());
//Facilitamos el envío de archivos
app.use(express.urlencoded({extended: true}));

app.use('/files', express.static(path.resolve(__dirname, '../', 'tmp', 'uploads')));

//Cargamos las rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/photos', photoRoutes);
app.use(routes);

//Fijamos en que puerto va a trabajar el servidor
app.listen(process.env.PORT || 5000);