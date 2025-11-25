import mongoose from "mongoose";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TNotification = {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  data?: any;
  deliveryStatus?: "pending" | "sent" | "failed";
  expoTicket?: any;
  createdAt: Date;
  updatedAt: Date;
};
