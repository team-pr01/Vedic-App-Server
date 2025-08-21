import { Schema, model } from "mongoose";
import { TRecipe } from "./recipe.interface";

const CategorySchema = new Schema<TRecipe>(
  {
    name: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = model<TRecipe>("Recipe", CategorySchema);
export default Recipe;
