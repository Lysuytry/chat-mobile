import Message from '../../models/message';

export const createMessage = async (req, res) => {
  try {
    const { username, content, channel } = req.body;
    const message = new Message({ username, content, channel });
    const result = await message.save();
    res.success(result);
  } catch (error) {
    res.fail(error.message);
  }
};

export const getMessageList = async (req, res) => {
  try {
    const { limit, skip = 0 } = req.query;

    const condition = {};

    const [messages, total] = await Promise.all([
      Message.find(condition)
        .skip(skip)
        .limit(limit),
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
    const message = await Message.findOne({ _id: id });
    res.success(message);
  } catch (error) {
    res.fail(error.message);
  }
};
