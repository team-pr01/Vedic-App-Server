import { Types } from "mongoose";

export type TTemple = {
  name: string;
  mainDeity: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  establishedYear: number;
  visitingHours: string;
  phone: string;
  email: string;
  website?: string;
  imageUrl: string;
  // mediaGallery: string[];
  videoUrl?: string;
  events?: {
    name: string;
    date: Date;
    time: string;
    description: string;
  }[];
  status : string;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
