import { Types } from "mongoose";

export type TReels = {
  title: string;
  description: string;
  videoUrl: string;
  videoSource: string;
  category: string;
  tags: string[];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};