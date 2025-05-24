import { Schema, model } from "mongoose";
import { TVastu } from "./vastu.interface";

const VastuSchema = new Schema<TVastu>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    importance: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    recommendations: {
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

const Vastu = model<TVastu>("Vastu", VastuSchema);
export default Vastu;
