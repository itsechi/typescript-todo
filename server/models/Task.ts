import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
});

export default model('Task', TaskSchema);
