import { Types } from "mongoose";

export type TVastu = {
  title: string;
  description: string;
  category: string;
  direction: string;
  imageUrl: string;
  importance: "high" | "medium" | "low";
  recommendations: string[];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
