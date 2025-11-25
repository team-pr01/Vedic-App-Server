import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NotificationServices } from "./notification.services";
import { io } from "../../../server";

const sendNotification = catchAsync(async (req, res) => {
  const { userIds, title, message, data } = req.body;

  const result = await NotificationServices.sendNotification({
    userIds,
    title,
    message,
    data,
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

// Get All Notifications
const getAllNotificationsForUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result =
    await NotificationServices.getAllNotificationsForUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notifications fetched successfully",
    data: result,
  });
});

export const NotificationControllers = {
  sendNotification,
  getAllNotifications,
  getAllNotificationsForUser,
};
