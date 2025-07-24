import { Schema, model } from "mongoose";
import { TReelCategory } from "./reelCategory.interface";

const ReelCategorySchema = new Schema<TReelCategory>(
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

const ReelCategory = model<TReelCategory>("ReelCategory", ReelCategorySchema);

export default ReelCategory;
