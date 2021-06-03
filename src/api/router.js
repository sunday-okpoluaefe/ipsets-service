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

/*
server {

        #root /var/www/example.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name auth.staging.daisbox.com www.auth.staging.daisbox.com;

        location / {
            #try_files $uri $uri/ =404;
            proxy_pass          http://localhost:2020;
            proxy_redirect      http://localhost:2020 https://auth.staging.daisbox.com;

        }


 */
