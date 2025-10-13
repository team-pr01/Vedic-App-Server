import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NotificationServices } from "./notification.services";
import { io } from "../../../server";

const sendNotification = catchAsync(async (req, res) => {
  const { userIds, title, message } = req.body;

  const result = await NotificationServices.sendNotification({
    userIds,
    title,
    message,
  });

  io.emit("new-push-notification", {
    title: "Emergency Message",
    message: message,
    createdAt: Date.now(),
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Push notifications processed",
    data: result,
  });
});


// Get All
const getAllNotifications = catchAsync(async (_req, res) => {
  const result = await NotificationServices.getAllNotifications();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notifications fetched successfully.",
    data: result,
  });
});

// Get Single
const getSingleNotificationById = catchAsync(async (req, res) => {
  const { notificationId } = req.params;
  const result = await NotificationServices.getSingleNotificationById(notificationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification fetched successfully.",
    data: result,
  });
});

// Delete
const deleteNotification = catchAsync(async (req, res) => {
  const { notificationId } = req.params;
  const result = await NotificationServices.deleteNotification(notificationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification deleted successfully.",
    data: result,
  });
});

export const NotificationControllers = {
  sendNotification,
  getAllNotifications,
  getSingleNotificationById,
  deleteNotification,
};
