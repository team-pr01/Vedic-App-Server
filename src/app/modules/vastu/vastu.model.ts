import { Schema, model } from "mongoose";
import { TVastu } from "./vastu.interface";

const VastuSchema = new Schema<TVastu>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vastu = model<TVastu>("Vastu", VastuSchema);
export default Vastu;
