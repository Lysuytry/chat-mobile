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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { DBNAME, DBUSER, DBPASS } = process.env;

_mongoose2.default.connect(`mongodb://${DBUSER}:${DBPASS}@ds243441.mlab.com:43441/${DBNAME}`, () => {
  console.log('connected mLab');
});

const app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

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

app.use('/api/v1/users', _user2.default);
// app.use((req, res) => {
//   res.success('hello');
// });
app.use(`/api/v1/channels`, _channel2.default);

exports.default = app;
//# sourceMappingURL=app.js.map