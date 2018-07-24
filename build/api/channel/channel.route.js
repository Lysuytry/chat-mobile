'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _channel = require('./channel.api');

var _channel2 = require('./channel.middleware');

var _message = require('../../models/message');

const channelRoute = (0, _express.Router)();

channelRoute.get('/', _channel.getChannelList);
channelRoute.post('/', _channel2.validateCreatedChannel, _channel.createChannel);
channelRoute.get('/:id', _channel.getChannelById);
channelRoute.put('/:id', _channel.updateChannelById);
channelRoute.delete('/:id', _channel.deleteChannelById);
channelRoute.get('/:id/messages', _message.getMessagesByChannelId);

exports.default = channelRoute;
//# sourceMappingURL=channel.route.js.map