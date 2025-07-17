import { Schema, model } from "mongoose";
import { TBook } from "./book.interface";

const BookSchema = new Schema<TBook>(
  {
    imageUrl: {
      type: String,
      default: "",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Content = model<TBook>("Book", BookSchema);
export default Content;
