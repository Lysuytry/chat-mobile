import mongoose, { Schema } from 'mongoose';

const channelSchema = Schema({
  name: {type: String, required: true},
  status: {type: String, default: 'active'},
  limit: {type: Number, required:true, default: 10}
}, {timestamps: true});

channelSchema.set('toJSON', { virtuals: false});

export default mongoose.model('Channel', channelSchema);

