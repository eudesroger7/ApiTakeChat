const express = require('express');
const routes = require('./routes');

const port = 6696;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port);
