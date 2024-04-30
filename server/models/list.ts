import { Schema, model } from 'mongoose';

const ListSchema = new Schema({
  listTitle: {
    type: String,
  },
});

export default model('List', ListSchema);
