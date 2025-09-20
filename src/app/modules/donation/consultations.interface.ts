import { ObjectId } from "mongoose";

export type TConsultation = {
  userId: ObjectId;
  userName: string;
  userPhoneNumber: string;
  userEmail?: string;
  consultantId: ObjectId;
  consultantName: string;
  consultantPhoneNumber: string;
  consultantEmail?: string;
  concern ?: string;
  fees: string;
  category : string;
  scheduledAt?: Date;
  status?: "pending" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
};
