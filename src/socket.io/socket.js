import { leftChannel, joinChannel } from '../models/user';
import { createMessage } from '../models/message';

export const chatHandler = socket => {
  socket.on('join', userId => {
    joinChannel(userId, socket);
  });

  socket.on('left', userId => {
    leftChannel(userId, socket);
  });

  socket.on('newMessage', data => {
    const { from, to, messages } = data;
    socket.broadcast.to(to).emit('addMessage', { to, from, messages });
    createMessage(data);
  });
};

export const onlineHandler = socket => {
  socket.on('online', () => {});

  socket.on('disconnect', () => {});
};
