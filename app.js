'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var soundCloud = require('./routes/soundCloud.js');
var api = require('./routes/api.js');
var http = require('http');
var path = require('path');

var app = express();
var developmentEnv = 'development' === app.get('env');

if (developmentEnv) {
  // development only
  console.log('Development Environment');
  app.configure(function () {
    app.set('views', __dirname + '/app');
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.errorHandler());
  });
}
else {
  // production
  console.log('Production Environment');
  app.configure(function () {
    app.set('views', __dirname + '/dist');
    app.use(express.static(path.join(__dirname, 'dist')));
  });
}

app.configure(function () {
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
});

// serve index and view partials
app.get('/', routes.index);

app.get('/soundcloud/auth/callback', soundCloud.getCallback);
app.get('/init_application', api.initApplication);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

module.exports = app;

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});