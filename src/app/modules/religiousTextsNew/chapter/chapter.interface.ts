import mongoose from "mongoose";

export type TChapter = { 
  bookId: mongoose.Types.ObjectId;
  title: string;
  type: "chapter" | "mandal" | "adhyay" | "sukta" | "section";
  order: number;
  createdAt: Date;
  updatedAt: Date;
};