import express from 'express'
import http from 'http'
import createChat from './public/chat.js'
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

app.use(express.static('public'))

const chat = createChat()

chat.subscribe((command) => {
  console.log('> Emiting '+command.type)
  sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
  const userId = socket.id
  console.log('> User connected: '+userId)

  chat.addUser({ userId: userId })

  socket.emit('setup', chat.state)

  socket.on('disconnect', () =>{
    chat.removeUser({ userId: userId })
    console.log('> user disconnected: '+userId)
  })

  socket.on('chat img', (img, name, userImg) => {
    socket.broadcast.emit('chat img', img, name, userImg);
  });
  socket.on('chat message', (msg, name, userImg) => {
    socket.broadcast.emit('chat message', msg, name, userImg);
  });
  socket.on('typing', (userImg) => {
    socket.broadcast.emit('typing', userImg);
  });
  socket.on('updateUsers', (name, userImg) => {
    socket.broadcast.emit('updateUsers', name, userImg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});