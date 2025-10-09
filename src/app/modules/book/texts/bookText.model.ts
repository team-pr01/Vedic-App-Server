import { Schema, model, Types } from "mongoose";
import { TBookText } from "./bookText.interface";

const BookTextSchema = new Schema<TBookText>(
  {
    bookId: { type: Types.ObjectId, ref: "Books", required: true },
    location: [
      {
        levelName: { type: String, required: true },
        value: { type: String, required: true, trim: true },
      },
    ],

    originalText: { type: String, required: true, trim: true },
    primaryTranslation: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BookText = model<TBookText>("BookText", BookTextSchema);
export default BookText;
