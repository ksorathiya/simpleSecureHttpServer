var app = require('express')()
var http = require('http')
var debug = require('debug')('server:');
var express = require('express');
var path = require('path');


// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
        realm: "myRealm"
    }, (username, password, callback) => {
        // Custom authentication
        // Use callback(error) if you want to throw async error.
        callback(username === "demo@test.com" && password === "mySecretPassword");
    }
);

app.use(auth.connect(basic),express.static(path.join(__dirname, 'public')));

app.set('port', 5000);

var server = http.createServer(app);

server.listen(5000);
server.on('error', onError);
server.on('listening', onListening);



/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

