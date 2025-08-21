import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NotificationServices } from "./notification.services";
import { io } from "../../../server";

const addNotification = catchAsync(async (req, res) => {
  const result = await NotificationServices.addNotification(req.body);

  // Emit to all connected clients
  io.emit('new-notification', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification added successfully',
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

// Update
const updateNotification = catchAsync(async (req, res) => {
  const { notificationId } = req.params;
  const result = await NotificationServices.updateNotification(notificationId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification updated successfully.",
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
  addNotification,
  getAllNotifications,
  getSingleNotificationById,
  updateNotification,
  deleteNotification,
};
