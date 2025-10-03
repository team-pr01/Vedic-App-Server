import { Schema, model } from "mongoose";
import { TDailyHoroscope } from "./dailyHoroscope.interface";

const DailyHoroscopeSchema = new Schema<TDailyHoroscope>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DailyHoroscope = model<TDailyHoroscope>(
  "DailyHoroscope",
  DailyHoroscopeSchema
);

export default DailyHoroscope;
