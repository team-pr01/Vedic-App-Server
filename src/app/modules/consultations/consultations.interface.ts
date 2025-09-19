import { ObjectId } from "mongoose";

export type TConsultation = {
  userId: ObjectId;
  consultantId: ObjectId;
  concern ?: string;
  fees: string;
  scheduledAt?: Date;
  status?: "pending" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
};
