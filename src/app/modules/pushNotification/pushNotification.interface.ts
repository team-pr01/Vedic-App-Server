/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export type TPushNotification = {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  deliveryStatus: "pending" | "sent" | "failed";
  expoTicket?: any;
  createdAt: Date;
  updatedAt: Date;
};