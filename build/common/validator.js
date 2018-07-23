'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validator = exports.validator = (data, schema, req, res, next) => {
  const error = _joi2.default.validate(data, schema);
  error.error === null ? next() : res.fail(error.error.details[0].message);
};
//# sourceMappingURL=validator.js.map