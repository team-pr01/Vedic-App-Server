import mongoose from "mongoose";

export type TSlokOrMantra = { 
  chapterId: mongoose.Types.ObjectId;
  type: "slok" | "mantra";
  number: number;
  originalText: string;
  translations: {
    [langCode: string]: string;
  };
  createdAt: Date;
  updatedAt: Date;
};