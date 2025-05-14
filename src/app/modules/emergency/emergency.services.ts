/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEmergency } from "./emergency.interface";
import Emergency from "./emergency.model";
import Product from "./emergency.model";

type TQuery = {
  keyword?: string;
  status?: string;
};


// Create product
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

// services/emergency.service.ts

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



// Delete product by id
const deleteEmergencyPost = async (emergencyId: string) => {
  const result = await Product.findByIdAndDelete(emergencyId);
  return result;
};


export const EmergencyServices = {
  postEmergency,
  getAllEmergencyPosts,
  getSingleEmergencyPostById,
  deleteEmergencyPost,
};
