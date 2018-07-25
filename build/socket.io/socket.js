'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlineHandler = exports.chatHandler = undefined;

var _user = require('../models/user');

var _message = require('../models/message');

let users = [];

const chatHandler = exports.chatHandler = socket => {
  socket.on('join', userId => {
    users = users.filter(item => item.id !== socket.id);
    users.push({ id: socket.id, userId: userId });
    (0, _user.joinChannel)(userId, socket);
  });

  socket.on('left', userId => {
    users = users.filter(item => item.id !== socket.id);
    (0, _user.leftChannel)(userId, socket);
  });

  socket.on('newMessage', data => {
    (0, _message.createMessage)(data, socket);
  });

  socket.on('disconnect', () => {
    (0, _user.leftChannel)('', socket);
    users = users.filter(item => item.id !== socket.id);
  });

  socket.on('error', msg => {
    console.log(msg);
    (0, _user.leftChannel)('', socket);
    users = users.filter(item => item.id !== socket.id);
  });
};

const onlineHandler = exports.onlineHandler = socket => {
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
//# sourceMappingURL=socket.js.map