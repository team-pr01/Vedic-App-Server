import { Schema, model } from "mongoose";
import { TNews } from "./news.interface";

const NewsSchema = new Schema<TNews>(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const News = model<TNews>("News", NewsSchema);
export default News;
