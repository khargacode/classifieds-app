import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IChatMessage {
  sender: mongoose.Types.ObjectId;
  message: string;
  timestamp: Date;
}

export interface IChat extends Document {
  ad: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  messages: IChatMessage[];
}

const ChatSchema = new Schema<IChat>(
  {
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default models.Chat || model<IChat>("Chat", ChatSchema);
