import { Schema, model } from "mongoose";
import { TEmergency } from "./emergency.interface";

const EmergencySchema = new Schema<TEmergency>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "moderate", "high", "critical"],
      default: "moderate",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "resolved"],
      default: "pending",
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Emergency = model<TEmergency>("Emergency", EmergencySchema);

export default Emergency;
