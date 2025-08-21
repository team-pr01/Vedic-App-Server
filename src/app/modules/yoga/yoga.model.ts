import { Schema, model } from "mongoose";
import { TYoga } from "./yoga.interface";

const YogaSchema = new Schema<TYoga>(
  {
    name: {
      type: String,
      required: true,
    },
    sanskritName: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    contraindications: {
      type: [String],
      default: [],
    },
    categories: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Yoga = model<TYoga>("Yoga", YogaSchema);
export default Yoga;
