'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _socket = require('./socket.io/socket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = require('http').Server(_app2.default);
const io = require('socket.io')(server);

const { PORT } = process.env;

//if no route match => matched this route instead
_app2.default.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//error handling middleware
//always at the bottom of the code
_app2.default.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err);
});

io.of('/chatroom').on('connection', _socket.chatHandler);
io.of('/online').on('connection', _socket.onlineHandler);

server.listen(PORT, () => {
  console.log(`We are open port ${PORT} for our express app`);
});
//# sourceMappingURL=index.js.map