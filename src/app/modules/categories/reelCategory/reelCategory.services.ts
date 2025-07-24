import httpStatus from "http-status";
import { TReelCategory } from "./reelCategory.interface";
import AppError from "../../../errors/AppError";
import ReelCategory from "./reelCategory.model";

// Add reel category (Admin only)
const addReelCategory = async (payload: TReelCategory) => {
  const { category } = payload;

  const payloadData = {
    category
  };

  const result = await ReelCategory.create(payloadData);
  return result;
};

// Get all reel categories
const getAllReelCategories = async () => {
  const result = await ReelCategory.find();
  return result;
};

// Get single reel category by ID
const getSingleReelCategoryById = async (categoryId: string) => {
  const result = await ReelCategory.findById(categoryId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Reel category not found");
  }
  return result;
};

// Delete reel category by ID
const deleteReelCategory = async (categoryId: string) => {
  const result = await ReelCategory.findByIdAndDelete(categoryId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Reel category not found");
  }
  return result;
};

export const ReelCategoryServices = {
  addReelCategory,
  getAllReelCategories,
  getSingleReelCategoryById,
  deleteReelCategory,
};
