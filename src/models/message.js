import mongoose, { Schema } from 'mongoose';
import User from './user';

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

export const createMessage = async (data, socket) => {
  try {
    const { userId, content, type } = data;
    const user = await User.findById({ _id: userId });
    const { username, channelId } = user;
    //console.log(channelId);
    const message = await Message.create({ username, content, channel: channelId, type });
    socket.broadcast.to(channelId).emit('addMessage', { username, content, type, createdAt: message.createdAt });
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