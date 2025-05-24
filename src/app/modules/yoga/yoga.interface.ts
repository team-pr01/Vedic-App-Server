import { Types } from "mongoose";

export type TYoga = {
  name: string;
  sanskritName?: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // in seconds
  benefits: string[];
  contraindications: string[];
  categories: string[];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
