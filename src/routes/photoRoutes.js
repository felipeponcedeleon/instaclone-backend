const { Router } = require('express');
const routes = Router();

const multer = require('multer');
const multerConfig = require('../config/multer');
const authMiddleware = require('../middleware/auth');

const PhotoController = require('../controllers/PhotoController');


/***** Photos *****/
//Crear (subir) foto
routes.post('/', authMiddleware, multer(multerConfig).single('file'), PhotoController.store);

//mostrar la/las foto/s
routes.get('/:id', authMiddleware, PhotoController.show);

routes.delete('/:id', authMiddleware, PhotoController.destroy);

module.exports = routes;