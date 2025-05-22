/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TEmergency } from "./emergency.interface";
import Emergency from "./emergency.model";
import Product from "./emergency.model";

type TQuery = {
  keyword?: string;
  status?: string;
};


// Create emergency post
const postEmergency = async (payload: TEmergency) => {
  const { user, message, location } = payload;

  // const imageUrls: string[] = [];

  // if (files && files.length > 0) {
  //   for (const file of files) {
  //     const imageName = `${name}-${Date.now()}`;
  //     const path = file.path;

  //     const { secure_url } = await sendImageToCloudinary(imageName, path);
  //     imageUrls.push(secure_url);
  //   }
  // }

  const payloadData = {
    user,
    message,
    location
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
  return result;
};

// Change emergency post status
const changeEmergencyPostStatus = async (
  emergencyId: string, 
  status: "pending" | "processing" | "resolved"
) => {
  const emergencyPost = await Emergency.findById(emergencyId);
  if (!emergencyPost) {
    throw new Error('Emergency post not found');
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
  console.log(payload);
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
  return result;
};


export const EmergencyServices = {
  postEmergency,
  getAllEmergencyPosts,
  getSingleEmergencyPostById,
  updateEmergencyPost,
  changeEmergencyPostStatus,
  deleteEmergencyPost,
};
