'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const channelSchema = (0, _mongoose.Schema)({
  name: { type: String, required: true },
  status: { type: String, default: 'active' },
  limit: { type: Number, required: true, default: 10 }
}, { timestamps: true });

channelSchema.set('toJSON', { virtuals: false });

exports.default = _mongoose2.default.model('Channel', channelSchema);
//# sourceMappingURL=channel.js.map