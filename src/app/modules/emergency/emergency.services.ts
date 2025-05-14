/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEmergency } from "./emergency.interface";
import Emergency from "./emergency.model";
import Product from "./emergency.model";

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

// Get all emergency posts
const getAllEmergencyPosts = async () => {
  const result = await Emergency.find().populate("user");
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
