/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Expo from 'expo-server-sdk';
import { User } from "../auth/auth.model";
import PushNotification from "./pushNotification.model";

const expo = new Expo();

const sendPushNotificationToUsers = async (payload: any) => {
  const { userIds, title, message, data } = payload;

  // 1) Fetch users
  const users = await User.find({ _id: { $in: userIds } }).select('_id expoPushToken');

  if (!users || users.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No users found for provided ids');
  }

  // 2) Create notification docs for each fetched user (preserve user order)
  const notificationsToInsert = users.map((u) => ({
    user: u._id,
    title,
    message,
    data,
    deliveryStatus: 'pending',
  }));

  const createdNotifications = await PushNotification.insertMany(notificationsToInsert, { ordered: true });

  // 3) Build messages and mapping (maps message index -> notification id)
  const messages: any[] = [];
  const mapping: { notificationId: any }[] = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const notif = createdNotifications[i];

    // skip users without a token but keep their Notification doc (already created)
    if (!user.expoPushToken || !Expo.isExpoPushToken(user.expoPushToken)) {
      await PushNotification.updateOne(
        { _id: notif._id },
        { $set: { deliveryStatus: 'failed', expoTicket: { error: 'no_or_invalid_expo_token' } } }
      );
      continue;
    }

    messages.push({
      to: user.expoPushToken,
      sound: 'default',
      title,
      body: message,
      data,
    });

    mapping.push({ notificationId: notif._id });
  }

  // 4) Send messages in chunks, update Notification docs with tickets/results
  const tickets: any[] = [];
  const chunks = expo.chunkPushNotifications(messages);

  let messageStartIndex = 0;
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);

      // update the Notification docs corresponding to this chunk
      for (let i = 0; i < ticketChunk.length; i++) {
        const ticket = ticketChunk[i];
        const mapIndex = messageStartIndex + i;
        const notificationId = mapping[mapIndex]?.notificationId;
        if (!notificationId) continue;

        const status = (ticket as any).id ? 'sent' : 'failed';
        await PushNotification.updateOne(
          { _id: notificationId },
          { $set: { deliveryStatus: status, expoTicket: ticket } }
        );
      }
      messageStartIndex += ticketChunk.length;
    } catch (error) {
      // log error and mark notifications in this chunk as failed
      console.error('Error sending Expo chunk:', error);

      for (let i = 0; i < chunk.length; i++) {
        const mapIndex = messageStartIndex + i;
        const notificationId = mapping[mapIndex]?.notificationId;
        if (!notificationId) continue;
        await PushNotification.updateOne(
          { _id: notificationId },
          { $set: { deliveryStatus: 'failed', expoTicket: { error: String(error) } } }
        );
      }
      messageStartIndex += chunk.length;
      // continue to next chunk (or you could choose to throw)
    }
  }

  return {
    createdNotificationsCount: createdNotifications.length,
    pushedCount: mapping.length,
    tickets,
  };
};


// Get All Popups (with optional title search)
const getAllPushNotificationForUser = async (userId: any) => {

  const result = await PushNotification.find({ user: userId });
  return result;
};


export const PushNotificationServices = {
  sendPushNotificationToUsers,
  getAllPushNotificationForUser,
};
