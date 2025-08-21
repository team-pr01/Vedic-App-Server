import mongoose from "mongoose";

export type TChapter = { 
  bookId: mongoose.Types.ObjectId;
  title: string;
  type: { type: string }[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
};