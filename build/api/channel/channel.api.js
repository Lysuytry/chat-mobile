'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteChannelById = exports.updateChannelById = exports.getChannelById = exports.getChannelList = exports.createChannel = undefined;

var _channel = require('../../models/channel');

var _channel2 = _interopRequireDefault(_channel);

var _user = require('../../models/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createChannel = exports.createChannel = async (req, res) => {
  try {
    const { name, limit } = req.body;
    const channel = new _channel2.default({ name, limit });
    const result = await channel.save();
    res.success(result);
  } catch (error) {
    res.fail(error.message);
  }
};

const getChannelList = exports.getChannelList = async (req, res) => {
  try {
    const { limit, skip, status } = req.query;

    const condition = { status };

    const [channels, total, all] = await Promise.all([_channel2.default.find(condition).skip(skip).limit(limit), _channel2.default.count(condition), (0, _user.countUserAllChannel)()]);
    channels.forEach(item => {
      all.forEach(item1 => {
        if (item.id == item1._id) {
          item.count = item1.count;
        }
      });
    });
    res.success(channels, { limit, skip, total });
  } catch (error) {
    res.fail(error.message);
  }
};

const getChannelById = exports.getChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const channel = await _channel2.default.findOne({ _id: id, status });
    res.success(channel);
  } catch (error) {
    res.fail(error.message);
  }
};

const updateChannelById = exports.updateChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const data = req.body;
    const conditions = [{ _id: id, status }, { $set: data }];
    await _channel2.default.updateOne(...conditions);
    res.success('Successfully Updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

const deleteChannelById = exports.deleteChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const conditions = [{ _id: id, status: 'active' }, { $set: { status: 'inactive' } }];
    const result = await _channel2.default.updateOne(...conditions);
    console.log(result);
    res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=channel.api.js.map