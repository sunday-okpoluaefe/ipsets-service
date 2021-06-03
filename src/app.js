
require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { load_ip_sets_from_server } = require('./api/helpers/ip_set');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3030;
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


app.set('trust proxy', true);

app.use(express.json()); // attach the express json middleware

app.use(config.get('api.basePath'), router); // atach API router

app.use(middlewares.error.catch); // attach error middleware to catch internal server errors
app.use(middlewares.error.notFound); // attach error middleware to catch 404 errors

http.listen(port, () => {
  /*
   * configure cronjob to update ipsets at 12AM Midnight
   */
  cron.schedule('0 0 0 * * *', () => {
    load_ip_sets_from_server()
      .then(r => {
        console.log('File Downloaded')
      });
  });

  load_ip_sets_from_server()
    .then(r => {
      console.log('File Downloaded...');
    });
  console.log('Server running on Port : 3030');

});

module.exports = app;
