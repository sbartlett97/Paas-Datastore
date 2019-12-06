'use strict';

//import the required utilities
const express = require('express');
const bodyParser = require('body-parser');

//link to our databse model
const db = require('./db-datastore');

//create our api router
const api = express.Router();


//pass register to the api for retrieval
api.get('/:reg', async (req, res) => {
  try {
    res.send(await db.get(req.params.reg));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

//pass the register and the value to be added to the api
api.post('/:reg', async (req, res) => {
  try {
    res.body = await db.post(req.params.reg, req.body);
    res.send();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

//pass the register and the new value to the api
api.put('/:reg', bodyParser.text(), async (req, res) => {
  try {
    await db.put(req.params.reg, req.body);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

//pass the register to be deleted to the api
api.delete('/:reg', async (req, res) => {
  try {
    await db.delete(req.params.reg);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

//export our api
module.exports = api;
