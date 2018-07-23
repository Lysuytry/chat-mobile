'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCreatedChannel = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

var _validator = require('../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);

const createChannelValidator = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  limit: _joi2.default.number()
});

const validateCreatedChannel = exports.validateCreatedChannel = (req, res, next) => {
  (0, _validator.validator)(req.body, createChannelValidator, req, res, next);
};
//# sourceMappingURL=channel.middleware.js.map