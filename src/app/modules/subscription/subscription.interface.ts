import { ObjectId } from "mongoose";

export type TSubscription = {
  subscriptionPlanName: string;
  userId: ObjectId;
  amount: string;
  paymentMethod: string;
  senderAccountNumber: string;
  endDate?: Date;
  status ?: "active" | "expired" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
};