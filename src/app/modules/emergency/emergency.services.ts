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

// Get single product by category
const geTEmergencysByCategory = async (categoryName: string) => {
  const result = await Product.find({category : categoryName});
  return result;
};

// const getMyProducts = async (sellerId: string) => {
//   const result = await Product.find({vendorId:sellerId});
//   return result;
// };

// Get all unique brands
const getAllBrands = async () => {
  const brands = await Product.find({ brand: "brand" });
  return brands;
};


// Delete product by id
const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};


export const EmergencyServices = {
  postEmergency,
  getAllEmergencyPosts,
  getSingleEmergencyPostById,
  geTEmergencysByCategory,
  deleteProduct,
  getAllBrands,
  // getMyProducts,
};
