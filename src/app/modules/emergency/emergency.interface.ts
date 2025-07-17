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
  title: string;
  message: string;
  severity: "low" | "moderate" | "high" | "critical";
  targetGroups: ("all" | "moderators" | "admins")[];
  // sentBy: Types.ObjectId;
};
