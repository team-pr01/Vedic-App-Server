import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TNotification } from "./notification.interface";
import Notification from "./notification.model";

const addNotification = async (payload: TNotification) => {
  const result = await Notification.create(payload);
  return result;
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

const updateNotification = async (
  notificationId: string,
  payload: Partial<TNotification>
) => {
  const existing = await Notification.findById(notificationId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
  }

  const result = await Notification.findByIdAndUpdate(notificationId, payload, {
    new: true,
    runValidators: true,
  });

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
  addNotification,
  getAllNotifications,
  getSingleNotificationById,
  updateNotification,
  deleteNotification,
};
