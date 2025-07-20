import { Types } from "mongoose";

// Single slok/mantra structure
export type TSlokOrMantra = {
  type: "slok" | "mantra";
  number: string;
  originalText: string;
  translations: {
    [langCode: string]: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

// Chapter with embedded slok/mantra list
export type TChapter = {
  chapterTitle?: string;
  type?: string[]; // e.g., ["slok", "mantra"]
  order?: number;
  slokOrMantras?: TSlokOrMantra[];
  createdAt?: Date;
  updatedAt?: Date;
};

// Book with chapters
export type TBook = {
  _id?: Types.ObjectId;
  imageUrl?: string;
  title: string;
  description: string;
  chapters?: TChapter[];
  createdAt?: Date;
  updatedAt?: Date;
};
