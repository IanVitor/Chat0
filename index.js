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
  socket.on('chat img', (img, name, userImg) => {
    socket.broadcast.emit('chat img', img, name, userImg);
  });
  socket.on('chat message', (msg, name, userImg) => {
    socket.broadcast.emit('chat message', msg, name, userImg);
  });
  socket.on('typing', (userImg) => {
    socket.broadcast.emit('typing', userImg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});