import { Schema, model } from "mongoose";
import { TChapter } from "./chapter.interface";

const ChapterSchema = new Schema<TChapter>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["chapter", "mandal", "adhyay", "sukta", "section"],
      default: "chapter",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Chapter = model<TChapter>("Chapter", ChapterSchema);
export default Chapter;
