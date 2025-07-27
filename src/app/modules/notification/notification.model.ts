import { Schema, model } from "mongoose";
import { TNotification } from "./notification.interface";

const NotificationSchema = new Schema<TNotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model<TNotification>("Notification", NotificationSchema);
export default Notification;