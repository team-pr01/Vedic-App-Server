import { Types } from "mongoose";

export type TYoga = {
  name: string;
  sanskritName?: string;
  description: string;
  videoUrl?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  benefits: string[];
  contraindications: string[];
  categories: string[];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
