#!/usr/bin/env node

import app from '../app';
import http from 'http';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';

// Load environment variables
dotenv.config();

// Normalize the port and set it in the app
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create an HTTP server and start listening on the port
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false
function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // Return the named pipe
    return val;
  }
  if (port >= 0) {
    // Return the port number
    return port;
  }
  return false;
}

// Event listener for HTTP server "error" event
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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

// Event listener for HTTP server "listening" event
function onListening(): void {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}
