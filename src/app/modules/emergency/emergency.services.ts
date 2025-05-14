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

// Get all product with filteration
const getAllProducts = async (
  page: number,
  limit: number,
  search?: string,
  category?: string,
  brand?: string,
  rating?: number,
  priceRange?: string
) => {
  const skip = (page - 1) * limit;

  // Search filter
  const searchFilter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  // Category filter
  const categoryFilter = category
    ? { category: { $regex: category, $options: "i" } }
    : {};

  // Brand filter
  const brandFilter = brand
    ? { brand: { $regex: brand, $options: "i" } }
    : {};

  // Rating filter (greater than or equal to the specified rating)
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};

  // Price range filter (e.g., "100-500")
  const priceFilter = priceRange
    ? {
        price: {
          $gte: Number(priceRange.split("-")[0]),
          $lte: Number(priceRange.split("-")[1]),
        },
      }
    : {};

  // Combined filters
  const filters = {
    ...searchFilter,
    ...categoryFilter,
    ...brandFilter,
    ...ratingFilter,
    ...priceFilter,
  };

  const [products, totalProducts] = await Promise.all([
    Product.find(filters).skip(skip).limit(limit),
    Product.countDocuments(filters),
  ]);

  return {
    products,
    totalProducts,
  };
};


// Get single product by id
const getSingleProductById = async (productId: string) => {
  const result = await Product.findById(productId);
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
  getAllProducts,
  getSingleProductById,
  geTEmergencysByCategory,
  deleteProduct,
  getAllBrands,
  // getMyProducts,
};
