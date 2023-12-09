import { Schema, Model } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export class UserModel extends Model {}

UserSchema.loadClass(UserModel);
