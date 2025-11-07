import { ObjectId } from "mongoose";

export type TSubscription = {
  subscriptionPlanName: string;
  userId: ObjectId;
  amount: string;
  paymentMethod: string;
  senderAccountNumber: string;
  endDate?: Date
  createdAt?: Date;
  updatedAt?: Date;
};