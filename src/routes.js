const {Router} = require('express');
const RepositoriesController = require('./controllers/repositories');
const usersController = require('./controllers/users');

const routes = Router();

routes.get('/repositories/:username', RepositoriesController.index);
routes.get('/users/:username', usersController.index);

module.exports = routes;
