import { Schema, model } from "mongoose";
import { TNews, TNewsTranslation } from "./news.interface";

const NewsTranslationSchema = new Schema<TNewsTranslation>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { _id: false }
);

const NewsSchema = new Schema<TNews>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    translations: {
      type: Map,
      of: NewsTranslationSchema,
      required: false,
    },
  },
  { timestamps: true }
);

const News = model<TNews>("News", NewsSchema);
export default News;
