'use strict';

const express = require('express');

const app = express();

app.use('/api', require('./api'));

app.use(express.static('static', { extensions: ['html'] }));

app.listen(8080);