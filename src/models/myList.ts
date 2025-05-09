import mongoose from "mongoose";
import { ContentType } from "../types/ContentType";
const myListSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    contentId: { type: String, required: true },
    contentType: { type: String, enum: Object.values(ContentType), required: true },
    addedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

myListSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export const MyList = mongoose.model("MyList", myListSchema);
