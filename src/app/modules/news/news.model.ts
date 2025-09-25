import { Schema, model } from "mongoose";
import { TNews, TNewsTranslation } from "./news.interface";

const NewsTranslationSchema = new Schema<TNewsTranslation>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
    
  },
  { _id: false }
);

const NewsSchema = new Schema<TNews>(
  {
    imageUrl: { type: String, required: true },
    translations: {
      type: Map,
      of: NewsTranslationSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const News = model<TNews>("News", NewsSchema);
export default News;
