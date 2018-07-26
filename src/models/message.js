import mongoose, { Schema } from 'mongoose';
import User from './user';
import { io } from '../index';
const messageSchema = Schema(
  {
    username: { type: String, required: true },
    content: { type: String },
    channel: { type: Schema.Types.ObjectId, ref: `Channel`, required: true },
    types: { type: String, default: 'message' }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export const createMessage = async (data, socket) => {
  try {
    const { userId, content } = data;
    const user = await User.findById({ _id: userId });
    const { username, channelId } = user;
    //console.log(channelId);
    const message = await Message.create({ username, content, channel: channelId });
    io.of('/chatroom')
      .to(channelId)
      .emit('addMessage', { username, content, createdAt: message.createdAt });
    return message;
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
      Message.aggregate([
        { $match: { channel: mongoose.Types.ObjectId(id) } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
      ]),
      Message.count(condition)
    ]);
    res.success(message, { count, skip, limit });
  } catch (error) {
    res.fail(error);
  }
};

export default Message;
