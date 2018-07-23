'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let users = [];
const chatHandler = exports.chatHandler = socket => {

  socket.on('join', userId => {});

  socket.on('left', data => {});

  socket.on('newMessage', data => {
    const { from, to, messages } = data;
    socket.broadcast.to(to).emit('addMessage', { to, from, messages });
  });
};
//# sourceMappingURL=socket.js.map