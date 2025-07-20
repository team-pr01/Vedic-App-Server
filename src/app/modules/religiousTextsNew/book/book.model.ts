import { Schema, model } from "mongoose";
import { TBook } from "./book.interface";

const SlokOrMantraSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["slok", "mantra"],
      required: true,
    },
    number: { type: String, required: true },
    originalText: { type: String, required: true },
    translations: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { _id: false, timestamps: true }
);

const ChapterSchema = new Schema(
  {
    chapterTitle: { type: String, default: "" },
    type: [{ type: [String], enum: ["slok", "mantra"], default: "slok" }],
    order: { type: Number, default: 0 },
    slokOrMantras: { type: [SlokOrMantraSchema], default: [] },
  },
  { _id: false }
);

const BookSchema = new Schema<TBook>(
  {
    imageUrl: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    chapters: { type: [ChapterSchema], default: [] },
  },
  { timestamps: true }
);

const Book = model<TBook>("Book", BookSchema);
export default Book;
