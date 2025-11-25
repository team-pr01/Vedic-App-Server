import { Schema, model } from "mongoose";
import { TNotification } from "./notification.interface";

const NotificationSchema = new Schema<TNotification>(
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
    deliveryStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    expoTicket: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

const Notification = model<TNotification>("Notification", NotificationSchema);
export default Notification;
