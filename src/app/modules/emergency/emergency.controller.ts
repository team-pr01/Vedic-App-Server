import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { EmergencyServices } from "./emergency.services";
import { io } from "../../../server";
import Notification from "../notification/notification.model";

// Send emergency message by admin
const sendEmergencyMessageAdmin = catchAsync(async (req, res) => {
  const result = await EmergencyServices.sendEmergencyMessageAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message forwarded successfully",
    data: result,
  });
});

// Create emergency post (For user)
const postEmergency = catchAsync(async (req, res) => {
  // const files = Array.isArray(req.files) ? req.files : [];
  const result = await EmergencyServices.postEmergency(req.body);

  await Notification.create({
    title: "Emergency Message",
    message: result.message,
    createdAt: result.createdAt,
  });
  

  io.emit("new-notification", {
    title: "Emergency Message",
    message: result.message,
    createdAt: result.createdAt,
    severity: result.severity,
    location: result.location,
    status: result.status,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "We have received your request and will get back to you soon.",
    data: result,
  });
});

// Get all emergency posts with search and filter by status
const getAllEmergencyPosts = catchAsync(async (req, res) => {
  const { keyword, status } = req.query;

  const result = await EmergencyServices.getAllEmergencyPosts({
    keyword: keyword as string,
    status: status as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Emergency posts fetched successfully.",
    data: result,
  });
});

// Get single product by id
const getSingleEmergencyPostById = catchAsync(async (req, res) => {
  const { emergencyId } = req.params;
  const result =
    await EmergencyServices.getSingleEmergencyPostById(emergencyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post fetched successfully.",
    data: result,
  });
});

// Update emergency post
const updateEmergencyPost = catchAsync(async (req, res) => {
  const { emergencyId } = req.params;
  const result = await EmergencyServices.updateEmergencyPost(
    emergencyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Emergency post updated successfully",
    data: result,
  });
});

// Change emergency post status
const changeEmergencyPostStatus = catchAsync(async (req, res) => {
  const { emergencyId } = req.params;
  const { status } = req.body;
  const result = await EmergencyServices.changeEmergencyPostStatus(
    emergencyId,
    status
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated to admin successfully",
    data: result,
  });
});

// Delete emergency post by id
const deleteEmergencyPost = catchAsync(async (req, res) => {
  const { emergencyId } = req.params;
  const result = await EmergencyServices.deleteEmergencyPost(emergencyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Emergency post deleted successfully",
    data: result,
  });
});

export const EmergencyControllers = {
  sendEmergencyMessageAdmin,
  postEmergency,
  getAllEmergencyPosts,
  getSingleEmergencyPostById,
  updateEmergencyPost,
  changeEmergencyPostStatus,
  deleteEmergencyPost,
};