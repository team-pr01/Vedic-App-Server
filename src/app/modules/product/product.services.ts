/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Product from "./product.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TProduct } from "./product.interface";

// Add Product (for admin)
const addProduct = async (
  payload: TProduct,
  file: Express.Multer.File | undefined
) => {
  const {
    name,
    category,
    productLink,
    description,
    basePrice,
    discountedPrice,
    currency,
    label,
    tags,
    videoUrl,
  } = payload;

  let imageUrl = "";

  if (file) {
    const imageName = `${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    imageUrl: imageUrl ? imageUrl : "",
    name,
    category,
    productLink,
    description,
    basePrice,
    discountedPrice,
    currency,
    label,
    tags,
    videoUrl: videoUrl || "",
    clicks: 0,
  };

  const result = await Product.create(payloadData);
  return result;
};

// Get all Products with pagination, search, and category filter
const getAllProducts = async (
  keyword?: string,
  category?: string,
  page = 1,
  limit = 10
) => {
  const query: any = {};

  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Product.find(query).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  return { data, meta };
};

// Get single Product by id
const getSingleProductById = async (productId: string) => {
  const result = await Product.findById(productId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

// Update Product
const updateProduct = async (
  productId: string,
  payload: Partial<TProduct>,
  file?: Express.Multer.File
) => {
  const existing = await Product.findById(productId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (file) {
    const imageName = `${Date.now()}`;
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.imageUrl = secure_url;
  }

  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Update Product
const updateProductClick = async (productId: string) => {
  const existing = await Product.findById(productId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const result = await Product.findByIdAndUpdate(
    productId,
    { clicks: existing?.clicks && existing?.clicks + 1 },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

// Delete Product
const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

export const ProductServices = {
  addProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  updateProductClick,
  deleteProduct,
};
