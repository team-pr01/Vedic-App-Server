import { Schema, model, Types } from "mongoose";
import { TBookText } from "./bookText.interface";

const BookTextSchema = new Schema<TBookText>(
  {
    bookId: {
      type: Types.ObjectId,
      ref: "Books",
      required: [true, "Book ID is required"],
    },
    location: {
      chapter: {
        type: String,
        required: [true, "Chapter is required"],
        trim: true,
      },
      verse: {
        type: String,
        required: [true, "Verse is required"],
        trim: true,
      },
    },
    originalText: {
      type: String,
      required: [true, "Original text is required"],
      trim: true,
    },
    primaryTranslation: {
      type: String,
      required: [true, "Primary translation is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    idVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BookText = model<TBookText>("BookText", BookTextSchema);
export default BookText;
