import httpStatus from "http-status";
import { TCategories } from "./categories.interface";
import AppError from "../../../errors/AppError";
import Categories from "./categories.model";

// Add a category (Admin only)
const addCategory = async (payload: TCategories) => {
  const { category, areaName } = payload;

  const payloadData = {
    category,
    areaName,
  };

  const result = await Categories.create(payloadData);
  return result;
};

// Get all categories
const getAllCategories = async () => {
  const result = await Categories.find();
  return result;
};

// Get single category by ID
const getSingleCategoryById = async (categoryId: string) => {
  const result = await Categories.findById(categoryId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return result;
};

// Delete category by ID
const deleteCategory = async (categoryId: string) => {
  const result = await Categories.findByIdAndDelete(categoryId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return result;
};

export const CategoryServices = {
  addCategory,
  getAllCategories,
  getSingleCategoryById,
  deleteCategory,
};
