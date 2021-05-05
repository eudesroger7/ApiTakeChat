const {Router} = require('express');
const RepositoriesController = require('./controllers/repositories');

const routes = Router();

routes.get('/repositories/:username', RepositoriesController.index);

module.exports = routes;
