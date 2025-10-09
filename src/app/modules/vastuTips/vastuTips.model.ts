import { Schema, model } from "mongoose";
import { TVastuTips } from "./vastuTips.interface";

const VastuTipsSchema = new Schema<TVastuTips>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    tips: {
      type: [String],
      required: true,
    },
    category : {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VastuTips = model<TVastuTips>("VastuTips", VastuTipsSchema);
export default VastuTips;
