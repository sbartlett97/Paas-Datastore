'use strict';

//use express js for easy setup
const express = require('express');

//create the app
const app = express();

//use our api on all /api URIs
app.use('/api', require('./api'));

//set the static test page
app.use(express.static('static', { extensions: ['html'] }));

//chose the deafult environmnet port (if configured) or use 3000
const port = process.env.PORT || 8080;

//listen on our port
app.listen(port);