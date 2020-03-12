const express = require('express');
const routes = require('./routes');

const app = express();

//Ocupamos json para la comunicación y respuestas
app.use(express.json());

//Cargamos las rutas
app.use(routes);

//Fijamos en que puerto va a trabajar el servidor
app.listen(process.env.PORT || 5000);