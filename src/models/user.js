import mongoose, { Schema } from 'mongoose';
import {io} from '../index';

const userSchema = Schema(
  {
    username: { type: String, required: true },
    socketId: { type: String },
    channelId: { type: Schema.Types.ObjectId, ref: 'Channel' }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export const countUserAllChannel = async () => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: '$channelId',
          count: { $sum: 1 }
        }
      }
    ]);
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteUserById = async id => {
  try {
    const result = await User.deleteOne({ _id: id });
    return result;
  } catch (error) {
    return error;
  }
};

export const countUserInChannel = async id => {
  try {
    const count = await User.count({ channelId: id });
    return count;
  } catch (error) {
    return error;
  }
};

export const leftChannel = async (id, socket) => {
  try {
    const result = await User.findOneAndRemove({ socketId: socket.id });
    if (!result) return new Error('Id is invalid.');
    socket.leave(result.channelId);
    const count = await countUserInChannel(result.channelId);
    socket.to(result.channelId).emit('count', count);
    return result;
  } catch (error) {
    return error;
  }
};

export const joinChannel = async (id, socket) => {
  try {
    const { channelId } = await User.findOneAndUpdate({ _id: id }, { $set: { socketId: socket.id } });
    if (!channelId) return new Error('Id is invalid.');
    socket.join(channelId);
    const count = await countUserInChannel(channelId);
    io.of('/chatroom').to(channelId).emit('count', count);
    //socket.broadcast.to(channelId).emit('count', count);
    return channelId;
  } catch (error) {
    return error;
  }
};

export default User;
