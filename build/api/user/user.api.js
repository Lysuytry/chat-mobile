'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserList = undefined;

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUserList = exports.getUserList = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const [user, count] = await Promise.all([_user2.default.aggregate([{ $limit: limit }, { $skip: skip }]), _user2.default.count()]);
    res.success(user, { count: +count, limit, skip });
  } catch (error) {
    res.fail(error.stack);
  }
};

const createUser = exports.createUser = async (req, res) => {
  try {
    const { username, channelId } = req.body;
    const check = await _user2.default.findOne({ username, channelId, socketId: { $ne: null } });
    if (check) return res.fail('Username is already taken!', 500);
    const user = await _user2.default.findOneAndUpdate({ username, channelId: { $in: [null, channelId] }, socketId: null }, { $set: req.body }, { upsert: true, new: true });
    //const user = await User.create(req.body);
    return res.success(user);
  } catch (error) {
    console.log(error.stack);
    return res.fail('create user error.');
  }
};

const updateUser = exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await _user2.default.updateOne({ _id: id }, { $set: req.body });
    res.success('Updated Successfully.');
  } catch (error) {
    res.fail(error);
  }
};

const deleteUser = exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await (0, _user.deleteUserById)(id);
    res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error);
  }
};

const getUserById = exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _user2.default.findById(id);
    res.success(result);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=user.api.js.map