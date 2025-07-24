import httpStatus from "http-status";
import { VastuCategoryServices } from "./vastuCategory.services";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

// Add vastu category (Admin only)
const addVastuCategory = catchAsync(async (req, res) => {
  const result = await VastuCategoryServices.addVastuCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu category added successfully",
    data: result,
  });
});

// Get all vastu categories
const getAllVastuCategories = catchAsync(async (req, res) => {
  const result = await VastuCategoryServices.getAllVastuCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu categories fetched successfully",
    data: result,
  });
});

// Get single vastu category by ID
const getSingleVastuCategoryById = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await VastuCategoryServices.getSingleVastuCategoryById(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu category fetched successfully",
    data: result,
  });
});

// Delete vastu category by ID
const deleteVastuCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await VastuCategoryServices.deleteVastuCategory(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu category deleted successfully",
    data: result,
  });
});

export const VastuCategoryController = {
  addVastuCategory,
  getAllVastuCategories,
  getSingleVastuCategoryById,
  deleteVastuCategory,
};
