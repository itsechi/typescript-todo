import { Schema, model } from 'mongoose';
import Task from './Task';

const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

ListSchema.pre('findOneAndDelete', async function (next) {
  try {
    const id = this.getQuery()['_id'];
    await Task.deleteMany({ listId: id });
    next();
  } catch (err) {
    console.error(
      `Error deleting all of the tasks attached to this list: ${err}`,
    );
  }
});

export default model('List', ListSchema);
