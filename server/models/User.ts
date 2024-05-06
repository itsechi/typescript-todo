import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});

export default model('User', UserSchema);
