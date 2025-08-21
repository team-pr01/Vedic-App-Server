import { Types } from "mongoose";

// Level 3: Slok / Mantra
export type TMantra = {
  name?: string;
  number?: string;
  originalText?: string;
  translations?: Record<string, string>; // e.g., { en: "text", hi: "text" }
};

// Level 2: Sukta / Sarga
export type TSubSection = {
  type?: string;
  number?: string;
  contents?: TMantra[];
};

// Level 1: Mandal / Kand / Adhyay
export type TSection = {
  name?: string;
  number?: string;
  contents?: TSubSection[];
};

// Main Book Interface
export type TBook = {
  _id?: Types.ObjectId;
  imageUrl?: string;
  title: string;
  category: string;         // Ramayan/Ved/etc
  subCategory?: string;     // Rigved/etc
  description?: string;
  sections?: TSection[];
  createdAt?: Date;
  updatedAt?: Date;
};
