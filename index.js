const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  socket.on('chat message', (msg, name, img) => {
    socket.broadcast.emit('chat message', msg, name, img);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});