import { ObjectId } from "mongoose";

export type TConsultation = {
  userId: ObjectId;
  consultantId: ObjectId;
  concern ?: string;
  fees: string;
  status?: "pending" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
};
