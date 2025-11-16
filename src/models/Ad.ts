import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAd extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AdSchema = new Schema<IAd>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default models.Ad || model<IAd>("Ad", AdSchema);
