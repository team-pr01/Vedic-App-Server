/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TEmergency, TEmergencyMessageAdmin } from "./emergency.interface";
import Emergency, { EmergencyMessageAdmin } from "./emergency.model";
import Product from "./emergency.model";

type TQuery = {
  keyword?: string;
  status?: string;
};

// src/app/modules/emergency/emergency.service.ts
import SocketManager from '../../socketManager';

const sendEmergencyMessageAdmin = async (payload: TEmergencyMessageAdmin) => {
  const { emergencyMessageId, title, userName, location, phoneNumber, adminMessage, status, userIds } = payload;

  const payloadData = {
    emergencyMessageId,
    title,
    userName,
    adminMessage,
    location,
    phoneNumber,
    status,
    userIds
  };

  const result = await EmergencyMessageAdmin.create(payloadData);

  // Emit to specific users if userIds are provided
  if (userIds && userIds.length > 0) {
    const io = SocketManager.getIoInstance();
    const connectedUsers = SocketManager.getConnectedUsers();
    
    if (io) {
      userIds.forEach((userId: string) => {
        const socketId = connectedUsers[userId];
        if (socketId) {
          io.to(socketId).emit('emergency-notification', {
            title,
            message: adminMessage,
            data: payloadData
          });
        } else {
          console.log(`User ${userId} is not currently connected`);
        }
      });
    }
  }

  return result;
};

// Create emergency post (For user)
const postEmergency = async (payload: TEmergency) => {
  const { user, message, location } = payload;

  const payloadData = {
    user,
    message,
    location,
  };

  const result = await Emergency.create(payloadData);

  return result;
};

// Get all emergency posts with search and filter by status
const getAllEmergencyPosts = async (query: TQuery) => {
  const { keyword, status } = query;

  const filter: any = {};

  if (keyword) {
    filter.message = { $regex: keyword, $options: "i" };
  }

  if (status) {
    filter.status = status;
  }

  const result = await Emergency.find(filter).populate("user");
  return result;
};

// Get single emergency post by id
const getSingleEmergencyPostById = async (emergencyId: string) => {
  const result = await Emergency.findById(emergencyId).populate("user");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Emergency post not found");
  }
  return result;
};

// Change emergency post status
const changeEmergencyPostStatus = async (
  emergencyId: string,
  status: "pending" | "processing" | "resolved"
) => {
  const emergencyPost = await Emergency.findById(emergencyId);
  if (!emergencyPost) {
    throw new Error("Emergency post not found");
  }

  // Update status
  emergencyPost.status = status;

  if (status === "resolved") {
    emergencyPost.resolvedAt = new Date();
  }

  await emergencyPost.save();
  return emergencyPost;
};

// Update emergency post
const updateEmergencyPost = async (
  emergencyId: string,
  payload: Partial<TEmergency>
) => {
  const existingPost = await Emergency.findById(emergencyId);

  if (!existingPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Emergency post not found");
  }

  const result = await Emergency.findByIdAndUpdate(emergencyId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete product by id
const deleteEmergencyPost = async (emergencyId: string) => {
  const result = await Product.findByIdAndDelete(emergencyId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Emergency post not found");
  }
  return result;
};

export const EmergencyServices = {
  sendEmergencyMessageAdmin,
  postEmergency,
  getAllEmergencyPosts,
  getSingleEmergencyPostById,
  updateEmergencyPost,
  changeEmergencyPostStatus,
  deleteEmergencyPost,
};
