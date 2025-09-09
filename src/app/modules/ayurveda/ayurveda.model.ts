import { Schema, model } from "mongoose";
import { TAyurveda } from "./ayurveda.interface";

const AyurvedaSchema = new Schema<TAyurveda>(
  {
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
    videoUrl: {
      type: String,
      required: false,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    expertName: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ayurveda = model<TAyurveda>("Ayurveda", AyurvedaSchema);
export default Ayurveda;
