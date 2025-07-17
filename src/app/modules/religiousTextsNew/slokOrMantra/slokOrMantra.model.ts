import { Schema, model } from "mongoose";
import { TSlokOrMantra } from "./slokOrMantra.interface";

const SlokOrMantraModelSchema = new Schema<TSlokOrMantra>(
 {
    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    type: {
      type: String,
      enum: ["slok", "mantra"],
      required: true,
    },
    number: { type: Number, required: true },
    originalText: { type: String, required: true },
    translations: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

const SlokOrMantraModel  = model<TSlokOrMantra>("SlokOrMantraModel ", SlokOrMantraModelSchema);
export default SlokOrMantraModel;