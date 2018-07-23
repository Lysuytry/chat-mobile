'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlineHandler = exports.chatHandler = undefined;

var _user = require('../models/user');

const chatHandler = exports.chatHandler = socket => {
  socket.on('join', userId => {
    (0, _user.joinChannel)(userId, socket);
  });

  socket.on('left', userId => {
    (0, _user.leftChannel)(userId, socket);
  });

  socket.on('newMessage', data => {
    const { from, to, messages } = data;
    socket.broadcast.to(to).emit('addMessage', { to, from, messages });
  });
};

const onlineHandler = exports.onlineHandler = socket => {
  socket.on('online', () => {});

  socket.on('disconnect', () => {});
};
//# sourceMappingURL=socket.js.map