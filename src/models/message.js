<<<<<<< HEAD
import mongoose, { Schema } from 'mongoose';

const messageSchema = Schema({
  type: {type: String, default: 'message' },
  username: {type: String, required: true},
  content: {type: String, required: true},
  channel: {type: Schema.Types.ObjectId, ref: `Channel`, required: true},
}, {timestamps: true});

messageSchema.set('toJSON', { virtuals: false});

export default mongoose.model('Message', messageSchema);
=======
// import mongoose, { Schema } from 'mongoose';
// import channel from './channel';

// // const channelSchema = Schema({
// //   name: {type: String, required: true},
// //   status: {type: String, default: 'active'},
// //   limit: {type: Number, required:true, default: 10}


// //   username: {type: String, required: true},
// //   content
// //   channel: {type: Schema.Types.ObjectId, ref: `Channel`, required: true},
// // }, {timestamps: true});

// channelSchema.set('toJSON', { virtuals: false});

// export default mongoose.model('Channel', channelSchema);
>>>>>>> 2a1ef0150e813d27197b1031295721640e8db911

