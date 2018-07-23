import mongoose, { Schema } from 'mongoose';

const messageSchema = Schema(
  {
    type: { type: String, default: 'message' },
    username: { type: String, required: true },
    content: { type: String },
    channel: { type: Schema.Types.ObjectId, ref: `Channel`, required: true }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export const createMessage = async data => {
  try {
    const { username, content, channel, type } = data;
    const message = new Message({ username, content, channel, type });
    const result = await message.save();
    return result;
  } catch (error) {
    return error;
  }
};

export const getMessagesByChannelId = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit, skip } = req.query;
    const condition = { channel: id };
    const [message, count] = await Promise.all([
      Message.aggregate([{$match: { channel: mongoose.Types.ObjectId(id)}} , { $sort: { createdAt: -1 }}, { $skip: skip }, { $limit: limit }]),
      Message.count(condition)
    ]);
    res.success(message, { count, skip, limit });
  } catch (error) {
    res.fail(error);
  }
};

export default Message;
