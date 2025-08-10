// src/models/notification.model.ts
import { model, Schema } from "mongoose";
import { TPushNotification } from "./pushNotification.interface";

const PushNotificationSchema = new Schema<TPushNotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { type: Schema.Types.Mixed, default: {} },
    read: { type: Boolean, default: false },
    deliveryStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    expoTicket: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const PushNotification = model<TPushNotification>("PushNotification", PushNotificationSchema);

export default PushNotification;
