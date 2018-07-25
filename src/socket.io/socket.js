import { leftChannel, joinChannel } from '../models/user';
import { createMessage } from '../models/message';
let users = [];

export const chatHandler = socket => {
  socket.on('join', userId => {
    users = users.filter(item => item.id !== socket.id);
    users.push({ id: socket.id, userId: userId });
    joinChannel(userId, socket);
  });

  socket.on('left', userId => {
    users = users.filter(item => item.id !== socket.id);
    leftChannel(userId, socket);
  });

  socket.on('newMessage', data => {
    createMessage(data, socket);
  });

  socket.on('disconnect', () => {
    leftChannel('', socket);
    users = users.filter(item => item.id !== socket.id);
  });

  socket.on('error', (msg) => {
    console.log(msg);
    leftChannel('', socket);
    users = users.filter(item => item.id !== socket.id);
  });
};

export const onlineHandler = socket => {
  socket.on('join', data => {
    const { name, channel } = data;
    users = users.filter(item => item.id !== socket.id);
    users.push({ id: socket.id, username: name, channel });
    socket.emit('updateOnline', users);
    socket.broadcast.emit('updateOnline', users);
  });

  socket.on('online', data => {
    const { name, channel } = data;
    users = users.filter(item => item.id !== socket.id);
    users.push({ id: socket.id, username: name, channel });
    socket.emit('updateOnline', users);
    socket.broadcast.emit('updateOnline', users);
  });

  socket.on('disconnect', () => {
    users = users.filter(item => item.id !== socket.id);
    socket.emit('updateOnline', users);
    socket.broadcast.emit('updateOnline', users);
  });
};
