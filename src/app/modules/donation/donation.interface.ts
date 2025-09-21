import { ObjectId } from "mongoose";

export type TDonation = {
  imageUrl?: string;
  donationProgramId: ObjectId;
  donationProgramTitle: string;
  userId: ObjectId;
  userName: string;
  userPhoneNumber: string;
  userEmail?: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  senderAccountNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
};