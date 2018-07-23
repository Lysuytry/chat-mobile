import mongoose, { Schema } from 'mongoose';

const channelSchema = Schema(
  {
    name: { type: String, required: true },
    status: { type: String, default: 'active' },
    limit: { type: Number, required: true, default: 10 }
  },
  { timestamps: true }
);

export default mongoose.model('Channel', channelSchema);
