import Message from '../../models/message';

export const createMessage = async (req, res) => {
  try {
    const { username, content, channel, type } = req.body;
    const message = new Message({ username, content, channel, type });
    const result = await message.save();
    res.success(result);
  } catch (error) {
    res.fail(error.message);
  }
};

export const getMessageList = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const condition = {};

    const [messages, total] = await Promise.all([
      Message.aggregate([{$sort: {createdAt: -1} }, {$skip: skip}, {$limit: limit}]),
      Message.count(condition)
    ]);
    res.success(messages, { limit, skip, total });
  } catch (error) {
    res.fail(error.message);
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const message = await Message.findOne({ _id: id, status });
    res.success(message);
  } catch (error) {
    res.fail(error.message);
  }
};

export const updateMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const data = req.body;
    const conditions = [{ _id: id, status }, { $set: data }];
    await Message.updateOne(...conditions);
    res.success('Successfully Updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

export const deleteMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const conditions = [{ _id: id, status: 'active' }, { $set: { status: 'inactive' } }];
    const result = await Message.updateOne(...conditions);
    console.log(result);
    res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};
