import httpStatus from "http-status";
import { ReelCategoryServices } from "./reelCategory.services";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

// Add reel category (Admin only)
const addReelCategory = catchAsync(async (req, res) => {
  const result = await ReelCategoryServices.addReelCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel category added successfully",
    data: result,
  });
});

// Get all reel categories
const getAllReelCategories = catchAsync(async (req, res) => {
  const result = await ReelCategoryServices.getAllReelCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel categories fetched successfully",
    data: result,
  });
});

// Get single reel category by ID
const getSingleReelCategoryById = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result =
    await ReelCategoryServices.getSingleReelCategoryById(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel category fetched successfully",
    data: result,
  });
});

// Delete reel category by ID
const deleteReelCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await ReelCategoryServices.deleteReelCategory(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel category deleted successfully",
    data: result,
  });
});

export const ReelCategoryController = {
  addReelCategory,
  getAllReelCategories,
  getSingleReelCategoryById,
  deleteReelCategory,
};
