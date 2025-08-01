import { Types } from "mongoose";

export type TEmergency = {
  user: Types.ObjectId;
  message: string;
  location: string;
  severity?: "low" | "moderate" | "high" | "critical";
  status?: "pending" | "processing" | "resolved";
  resolvedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TEmergencyMessageAdmin = {
  emergencyMessageId : Types.ObjectId;
  title?: string;
  adminMessage?: string;
  targetGroups: ("all" | "moderators" | "admins")[];
};
