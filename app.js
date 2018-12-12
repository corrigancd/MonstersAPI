const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes'); // see index in routes folder for link to all routes
const app = express();

app.use(bodyParser.json());
app.use('/', routes); //app.use is called once in app.js for all calls to the route folder

app.use((err, req, res, next) => { // error handler function
   res.json(err);
});

module.exports = app;