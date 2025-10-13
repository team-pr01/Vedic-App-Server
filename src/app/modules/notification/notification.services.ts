/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Notification from "./notification.model";
import { User } from "../auth/auth.model";
import Expo from "expo-server-sdk";

const expo = new Expo();

const sendNotification = async (payload: any) => {
  const { userIds, title, message } = payload;

  const users = await User.find({ _id: { $in: userIds } }).select(
    "_id expoPushToken"
  );

  if (!users || users.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No users found for provided ids");
  }

  const notificationsToInsert = users.map((u) => ({
    user: u._id,
    title,
    message,
  }));

  const createdNotifications = await Notification.insertMany(
    notificationsToInsert,
    { ordered: true }
  );

  const messages: any[] = [];
  const mapping: { notificationId: any }[] = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const notif = createdNotifications[i];

    if (!user.expoPushToken || !Expo.isExpoPushToken(user.expoPushToken)) {
      await Notification.updateOne(
        { _id: notif._id },
        {
          $set: {
            deliveryStatus: "failed",
            expoTicket: { error: "no_or_invalid_expo_token" },
          },
        }
      );
      continue;
    }

    messages.push({
      to: user.expoPushToken,
      sound: "default",
      title,
      body: message,
    });

    mapping.push({ notificationId: notif._id });
  }

  const tickets: any[] = [];
  const chunks = expo.chunkPushNotifications(messages);

  let messageStartIndex = 0;
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);

      for (let i = 0; i < ticketChunk.length; i++) {
        const ticket = ticketChunk[i];
        const mapIndex = messageStartIndex + i;
        const notificationId = mapping[mapIndex]?.notificationId;
        if (!notificationId) continue;

        const status = (ticket as any).id ? "sent" : "failed";
        await Notification.updateOne(
          { _id: notificationId },
          { $set: { deliveryStatus: status, expoTicket: ticket } }
        );
      }
      messageStartIndex += ticketChunk.length;
    } catch (error) {
      console.error("Error sending Expo chunk:", error);

      for (let i = 0; i < chunk.length; i++) {
        const mapIndex = messageStartIndex + i;
        const notificationId = mapping[mapIndex]?.notificationId;
        if (!notificationId) continue;
        await Notification.updateOne(
          { _id: notificationId },
          {
            $set: {
              deliveryStatus: "failed",
              expoTicket: { error: String(error) },
            },
          }
        );
      }
      messageStartIndex += chunk.length;
    }
  }

  return {
    createdNotificationsCount: createdNotifications.length,
    pushedCount: mapping.length,
    tickets,
  };
};

const getAllNotifications = async () => {
  return await Notification.find();
};

const getSingleNotificationById = async (notificationId: string) => {
  const result = await Notification.findById(notificationId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
  }
  return result;
};

const deleteNotification = async (notificationId: string) => {
  const existing = await Notification.findById(notificationId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
  }

  return await Notification.findByIdAndDelete(notificationId);
};

export const NotificationServices = {
  sendNotification,
  getAllNotifications,
  getSingleNotificationById,
  deleteNotification,
};
