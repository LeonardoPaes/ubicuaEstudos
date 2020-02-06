const { Router } = require('express');
const UserController = require('./controllers/UserController');

const routes = Router();

routes.post('/user', UserController.cadastrarUser);
routes.get('/user', UserController.consultarUsers);

module.exports = routes;
