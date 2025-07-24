import { Schema, model } from "mongoose";
import { TVastuCategory } from "./vastuCategory.interface";

const VastuCategorySchema = new Schema<TVastuCategory>(
  {
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VastuCategory = model<TVastuCategory>("VastuCategory", VastuCategorySchema);

export default VastuCategory;
