/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import ProductBanner from "./productBanner.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TProductBanner } from "./productBanner.interface";

// Add Product Banner
const addProductBanner = async (
  payload: TProductBanner,
  file: Express.Multer.File | undefined
) => {
  const { title, description, link } = payload;

  let imageUrl = "";

  if (file) {
    const imageName = `${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    imageUrl: imageUrl || "",
    title,
    description,
    link,
  };

  const result = await ProductBanner.create(payloadData);
  return result;
};

// Get all Product Banners (pagination + search)
const getAllProductBanners = async () => {
  const result = await ProductBanner.find();
  return result;
};

// Get single Product Banner
const getSingleProductBanner = async (bannerId: string) => {
  const result = await ProductBanner.findById(bannerId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product banner not found");
  }
  return result;
};

// Update Product Banner
const updateProductBanner = async (
  bannerId: string,
  payload: Partial<TProductBanner>,
  file?: Express.Multer.File
) => {
  const existing = await ProductBanner.findById(bannerId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Product banner not found");
  }

  if (file) {
    const imageName = `${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.imageUrl = secure_url;
  }

  const result = await ProductBanner.findByIdAndUpdate(bannerId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete Product Banner
const deleteProductBanner = async (bannerId: string) => {
  const result = await ProductBanner.findByIdAndDelete(bannerId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product banner not found");
  }
  return result;
};

export const ProductBannerServices = {
  addProductBanner,
  getAllProductBanners,
  getSingleProductBanner,
  updateProductBanner,
  deleteProductBanner,
};
