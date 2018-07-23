'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _channel = require('./channel.api');

var _channel2 = require('./channel.middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const channelRoute = _express2.default.Router();

channelRoute.get('/', _channel.getChannelList);
channelRoute.post('/', _channel2.validateCreatedChannel, _channel.createChannel);
channelRoute.get('/:id', _channel.getChannelById);
channelRoute.put('/:id', _channel.updateChannelById);
channelRoute.delete('/:id', _channel.deleteChannelById);

exports.default = channelRoute;
//# sourceMappingURL=channel.route.js.map