'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserList = undefined;

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { DBNAME } = process.env;
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
    const user = await _user2.default.create(req.body);
    res.success(user);
  } catch (error) {
    let message; // = error.code === 11000 ? 'Username or Email is taken.' : error.message;
    if (error.code === 11000) {
      message = Object.values(error.message).indexOf(`E11000 duplicate key error index: ${DBNAME}.users.$email_1 dup key: `) > -1 ? 'Email is taken.' : 'Username is taken.';
    } else {
      message = error.message;
    }
    res.fail(message);
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