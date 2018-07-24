import mongoose, { Schema } from 'mongoose';

const channelSchema = Schema(
  {
    name: { type: String, required: true },
    status: { type: String, default: 'active' },
    count: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Channel', channelSchema);
