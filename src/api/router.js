/**
 * Router
 */

const express = require('express');

const app = express();

const {
  IpSetRoutes
} = require('./providers/routes');

app.use('/ip', IpSetRoutes);

module.exports = app;
