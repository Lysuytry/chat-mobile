'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserUpdating = exports.validateUserCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

var _validator = require('../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);


const userCreatingSchema = _joi2.default.object().keys({
  username: _joi2.default.string().required()
});

const userUpdatingSchema = _joi2.default.object().keys({
  username: _joi2.default.string(),
  channelId: _joi2.default.objectId()
});

const validateUserCreating = exports.validateUserCreating = (req, res, next) => {
  (0, _validator.validator)(req.body, userCreatingSchema, req, res, next);
};

const validateUserUpdating = exports.validateUserUpdating = (req, res, next) => {
  (0, _validator.validator)(req.body, userUpdatingSchema, req, res, next);
};
//# sourceMappingURL=user.middleware.js.map