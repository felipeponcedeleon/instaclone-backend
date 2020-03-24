const { Router } = require('express');
const routes = Router();

const authMiddleware = require('../middleware/auth');

const LikeController = require('../controllers/LikeController');

/***** Likes *****/
routes.post('/:photo', authMiddleware, LikeController.store);


module.exports = routes;