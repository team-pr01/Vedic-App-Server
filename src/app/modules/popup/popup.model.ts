import { Schema, model } from "mongoose";
import { TPopup } from "./popup.interface";

const PopupSchema = new Schema<TPopup>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    btnLink: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    displayFrequency: {
      type: String,
      required: true,
      enum: ["once", "every-visit", "daily", "weekly"],
    },
  },
  { timestamps: true }
);

const Popup = model<TPopup>("Popup", PopupSchema);
export default Popup;
