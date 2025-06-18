#!/usr/bin/env node

import app from '../app';
import http from 'http';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import { startAllCronJobs } from '../cron'; // ✅ named import for cron

// Load environment variables
dotenv.config();

// Normalize the port and set it in the app
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// ✅ Listen only ONCE — no duplicates!
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  startAllCronJobs(); // 🟢 Start cron jobs here, once
});

// Handle errors
server.on('error', onError);
server.on('listening', onListening);

// ------------------------
// Helpers

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;       // Named pipe
  if (port >= 0) return port;        // Port number
  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`🔊 Listening on ${bind}`);
}
