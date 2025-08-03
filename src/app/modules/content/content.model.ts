import { Schema, model } from "mongoose";
import { TContent } from "./content.interface";

const ContentSchema = new Schema<TContent>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Content = model<TContent>("Content", ContentSchema);
export default Content;
