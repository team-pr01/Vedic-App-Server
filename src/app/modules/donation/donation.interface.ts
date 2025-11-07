import { ObjectId } from "mongoose";

export type TDonation = {
  donationProgramId: ObjectId;
  donationProgramTitle: string;
  userId: ObjectId;
  userName: string;
  userPhoneNumber: string;
  userEmail?: string;
  amount: string;
  paymentMethod: string;
  senderAccountNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
};