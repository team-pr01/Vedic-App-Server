import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PushNotificationServices } from "./pushNotification.services";

// Send push notification
const sendPushNotificationToUsers = catchAsync(async (req, res) => {
  const { userIds, title, message } = req.body;

  const result = await PushNotificationServices.sendPushNotificationToUsers({
    userIds,
    title,
    message,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Push notifications processed",
    data: result,
  });
});

export const PushNotificationControllers = {
  sendPushNotificationToUsers,
};
