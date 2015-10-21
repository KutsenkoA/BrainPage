var
  express = require('express'),
  path = require('path'),
  http = require('http');

var
  routes = require('./routes/index');

var
  app = express(),
  port = process.env.PORT || '9876',
  server = http.createServer(app);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({
    message: err.message,
    error: {}
  });
});

server.listen(port);