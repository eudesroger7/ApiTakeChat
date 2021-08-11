const {Router} = require('express');
const RepositoriesController = require('./controllers/repositories');
const UsersController = require('./controllers/users');

const routes = Router();

routes.get('/repositories/:username', RepositoriesController.index);
routes.get('/users/:username', UsersController.index);

module.exports = routes;
