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
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  imageUrl: string;
  videoUrl?: string;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
