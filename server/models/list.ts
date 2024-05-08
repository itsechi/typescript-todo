import { Schema, model } from 'mongoose';

const ListSchema = new Schema({
  listTitle: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('List', ListSchema);
