import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String }
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
