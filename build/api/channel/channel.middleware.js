'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateGetListChannels = exports.validateCreatedChannel = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);

const createChannelValidator = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  limit: _joi2.default.number().required()
});

const getListChannelsValidator = _joi2.default.object().keys({
  limit: _joi2.default.number().max(100),
  skip: _joi2.default.number().min(0),
  status: _joi2.default.any().allow('active')
});

// const updateSubjectValidator = Joi.object().keys({
//   name: Joi.string(),
//   teachers: Joi.array()
// });

const validateCreatedChannel = exports.validateCreatedChannel = (req, res, next) => {
  try {
    const { name, limit } = req.body;
    const error = _joi2.default.validate({ name, limit }, createChannelValidator);
    error.error === null ? next() : res.fail(error);
  } catch (error) {
    res.fail(error.message);
  }
};

const validateGetListChannels = exports.validateGetListChannels = (req, res, next) => {
  try {
    const { limit, skip = 0, status } = req.query;
    const error = _joi2.default.validate({ limit, skip, status }, getListChannelsValidator);
    error.error === null ? next() : res.fail(error);
  } catch (error) {
    res.fail(error.message);
  }
};

// export const validateUpdateSubject = (req, res, next) => {
//   try {
//     const { name, teachers } = req.body;
//     const error = Joi.validate({ name, teachers }, updateSubjectValidator);
//     error.error === null ? next() : res.fail(error.value);
//   } catch (error) {
//     res.fail(error.message);
//   }
// };
//# sourceMappingURL=channel.middleware.js.map