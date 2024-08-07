import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Your name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    perHour: {
      type: String,
      required: [true, 'Hourly rate is required'],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
