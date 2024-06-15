import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  displayName: string;
}

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

export default model<IUser>('User', UserSchema);
