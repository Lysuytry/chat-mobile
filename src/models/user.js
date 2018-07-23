import mongoose, { Schema } from 'mongoose';

const userSchema = Schema(
  {
    username: { type: String, required: true, unique: true },
    channelId: { type: Schema.Types.ObjectId, ref: 'Channel' }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export const deleteUserById = async id => {
  try {
    const result = await User.deleteOne({ _id: id });
    return result;
  } catch (error) {
    return error;
  }
};

export const countUserInChannel = async id => {
  try{
    const count = await User.count({channelId: id});
    return count;
  } catch(error){
    return error;
  }
};

export const leftChannel = async id => {
  try {
    const result = await User.updateOne({ _id: id }, { $set: { channelId: null } });
    return result;
  } catch (error) {
    return error;
  }
};

export const joinChannel = async (id, channelId) => {
  try {
    const result = await User.updateOne({ _id: id }, { $set: { channelId } });
    return result;
  } catch (error) {
    return error;
  }
};

export default User;
