require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 2020;
// const cors = require('cors');
const config = require('config');

const middlewares = require('./api/providers/middlewares');

// attach respond helper
app.use(middlewares.respond);
const router = require('./api/router');

//= =================================================
// Setting up Cross Origin Resource Sharing
//= =================================================
// app.use(cors()); // attach cors header middleware

// ==================================================
// Setting up Cross Origin Resource Sharing
// ==================================================
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token');

  next();
});

require('./config/database')(); // Connect to DB

app.set('trust proxy', true);

app.use(express.json()); // attach the express json middleware

app.use(config.get('api.basePath'), router); // atach API router

app.use(middlewares.error.catch); // attach error middleware to catch internal server errors
app.use(middlewares.error.notFound); // attach error middleware to catch 404 errors

http.listen(port, () => {
  console.log(`App started. listening at port: ${port}`);
});

module.exports = app;
