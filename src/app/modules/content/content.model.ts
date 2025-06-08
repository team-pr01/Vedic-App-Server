import { Schema, model } from "mongoose";
import { TContent } from "./content.interface";

const ContentSchema = new Schema<TContent>(
  {
    imageUrl: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Content = model<TContent>("Content", ContentSchema);
export default Content;
