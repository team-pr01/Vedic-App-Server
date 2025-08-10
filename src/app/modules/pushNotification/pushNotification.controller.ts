import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PushNotificationServices } from "./pushNotification.services";
import { io } from "../../../server";

// Send push notification
const sendPushNotificationToUsers = catchAsync(async (req, res) => {
  const { userIds, title, message, data } = req.body;

  const result = await PushNotificationServices.sendPushNotificationToUsers({
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

// Get All Notifications
const getAllPushNotificationForUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result =
    await PushNotificationServices.getAllPushNotificationForUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notifications fetched successfully",
    data: result,
  });
});

export const PushNotificationControllers = {
  sendPushNotificationToUsers,
  getAllPushNotificationForUser,
};
