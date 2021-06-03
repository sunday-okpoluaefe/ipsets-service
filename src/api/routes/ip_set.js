/**
 * IP Routes
 */
const express = require('express');
const router = express.Router();
const middlewares = require('../providers/middlewares');
const { IpSetController  } = require('../providers/controllers');

router.get('/match/', middlewares.async(IpSetController.match));

module.exports.IpSetRoutes = router;