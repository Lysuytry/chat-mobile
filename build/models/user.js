'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinChannel = exports.leftChannel = exports.countUserInChannel = exports.deleteUserById = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = (0, _mongoose.Schema)({
  username: { type: String, required: true, unique: true },
  channelId: { type: _mongoose.Schema.Types.ObjectId, ref: 'Channel' }
}, { timestamps: true });

const User = _mongoose2.default.model('User', userSchema);

const deleteUserById = exports.deleteUserById = async id => {
  try {
    const result = await User.deleteOne({ _id: id });
    return result;
  } catch (error) {
    return error;
  }
};

const countUserInChannel = exports.countUserInChannel = async id => {
  try {
    const count = await User.count({ channelId: id });
    return count;
  } catch (error) {
    return error;
  }
};

const leftChannel = exports.leftChannel = async (id, socket) => {
  try {
    const result = await User.findById(id);
    if (!result) return new Error('Id is invalid.');
    socket.leave(result.channelId);
    return result;
  } catch (error) {
    return error;
  }
};

const joinChannel = exports.joinChannel = async (id, socket) => {
  try {
    const result = await User.findById(id);
    if (!result) return new Error('Id is invalid.');
    socket.join(result.channelId);
    return result;
  } catch (error) {
    return error;
  }
};

exports.default = User;
//# sourceMappingURL=user.js.map