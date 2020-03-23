const Router = require('express');

const routes = Router();



const authMiddleware = require('./middleware/auth');


const HomeController = require('./controllers/HomeControllers');


const LikeController = require('./controllers/LikeController');



//HOME
routes.get('/', HomeController.home)






/***** Likes *****/
routes.post('/likes/:photo', authMiddleware, LikeController.store);

module.exports = routes;