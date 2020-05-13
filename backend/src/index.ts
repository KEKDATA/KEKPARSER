import WebSocket from 'ws';
import http from 'http';

const server = http.createServer();
const sockets = new WebSocket.Server({
  server,
});

sockets.on('connection', socket => {
  socket.on('message', message => {
    console.log('MESSAGE IS:', message);
  });
});

server.listen(8000);
