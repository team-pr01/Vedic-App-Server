import httpStatus from "http-status";
import { TVastuCategory } from "./vastuCategory.interface";
import AppError from "../../../errors/AppError";
import VastuCategory from "./vastuCategory.model";

// Add vastu category (Admin only)
const addVastuCategory = async (payload: TVastuCategory) => {
  const { category } = payload;

  const payloadData = {
    category,
  };

  const result = await VastuCategory.create(payloadData);
  return result;
};

// Get all vastu categories
const getAllVastuCategories = async () => {
  const result = await VastuCategory.find();
  return result;
};

// Get single vastu category by ID
const getSingleVastuCategoryById = async (categoryId: string) => {
  const result = await VastuCategory.findById(categoryId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu category not found");
  }
  return result;
};

// Delete vastu category by ID
const deleteVastuCategory = async (categoryId: string) => {
  const result = await VastuCategory.findByIdAndDelete(categoryId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu category not found");
  }
  return result;
};

export const VastuCategoryServices = {
  addVastuCategory,
  getAllVastuCategories,
  getSingleVastuCategoryById,
  deleteVastuCategory,
};
