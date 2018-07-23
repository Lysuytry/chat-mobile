import mongoose, { Schema } from 'mongoose';

const messageSchema = Schema(
  {
    type: {
      type: String,
      enum: ['message', 'emoji'],
      default: 'message'
    },
    username: { type: String, required: true },
    content: { type: String, required: true },
    channel: { type: Schema.Types.ObjectId, ref: `Channel`, required: true }
  },
  { timestamps: true }
);

messageSchema.set('toJSON', { virtuals: false });

export default mongoose.model('Message', messageSchema);
