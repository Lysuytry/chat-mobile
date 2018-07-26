'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _filterQuery = require('./common/filter-query');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('dotenv/config');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./api/user/user.route');

var _user2 = _interopRequireDefault(_user);

var _channel = require('./api/channel/channel.route');

var _channel2 = _interopRequireDefault(_channel);

var _message = require('./api/message/message.route');

var _message2 = _interopRequireDefault(_message);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { DBNAME, DBUSER, DBPASS, ENDPOINT } = process.env;

_mongoose2.default.connect(`mongodb://${DBUSER}:${DBPASS}@ds163850.mlab.com:63850/${DBNAME}`, () => {
  console.log('connected mLab');
});

const app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
  next();
});

app.use((req, res, next) => {
  //bind query
  (0, _filterQuery.filterQuery)(req);
  //for response success
  res.success = (data, options, code = 200) => {
    return typeof data === 'object' ? options ? res.status(code).json({ data, options }) : res.status(code).json(data) : res.status(code).json({ message: data });
  };
  //for response error
  res.fail = (message, code = 500) => {
    console.log(message);
    return res.status(code).json({ message });
  };
  //parse to next
  next();
});

app.use('/test', (req, res) => {
  const file = _path2.default.join(__dirname + '../../html/index.html');
  res.sendFile(file);
});

app.use('/firebaseWorked', (req, res) => {
  const file = _path2.default.join(__dirname + '../../auth/email-password.html');
  res.sendFile(file);
});

app.use('/firebase', (req, res) => {
  const file = _path2.default.join(__dirname + '../../auth2/loginForm.html');
  res.sendFile(file);
});

app.use(`${ENDPOINT}/users`, _user2.default);
app.use(`${ENDPOINT}/channels`, _channel2.default);
app.use(`${ENDPOINT}/messages`, _message2.default);

exports.default = app;
//# sourceMappingURL=app.js.map