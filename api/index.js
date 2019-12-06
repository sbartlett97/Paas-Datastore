'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db-datastore');

const api = express.Router();

api.get('/:reg', async (req, res) => {
  try {
    res.send(await db.get(req.params.reg));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.post('/:reg', async (req, res) => {
  try {
    res.send(await db.post(req.params.reg, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.put('/:reg', bodyParser.text(), async (req, res) => {
  try {
    await db.put(req.params.reg, req.body);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.delete('/:reg', async (req, res) => {
  try {
    res.send(await db.delete(req.params.reg));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


module.exports = api;
