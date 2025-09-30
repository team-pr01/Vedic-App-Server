import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VastuTipsServices } from "./vastuTips.services";

// Add Vastu Tip
const addVastuTip = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await VastuTipsServices.addVastuTip(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu Tip added successfully",
    data: result,
  });
});

// Get all Vastu Tips
const getAllVastuTips = catchAsync(async (req, res) => {
  const { keyword, category } = req.query;
  const result = await VastuTipsServices.getAllVastuTips(keyword, category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Vastu Tips fetched successfully",
    data: result,
  });
});

// Get single Vastu Tip by ID
const getSingleVastuTipById = catchAsync(async (req, res) => {
  const { vastuTipId } = req.params;
  const result = await VastuTipsServices.getSingleVastuTipById(vastuTipId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu Tip fetched successfully",
    data: result,
  });
});

// Update Vastu Tip
const updateVastuTip = catchAsync(async (req, res) => {
  const file = req.file;
  const { vastuTipId } = req.params;
  const result = await VastuTipsServices.updateVastuTip(vastuTipId, req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu Tip updated successfully",
    data: result,
  });
});

// Delete Vastu Tip
const deleteVastuTip = catchAsync(async (req, res) => {
  const { vastuTipId } = req.params;
  const result = await VastuTipsServices.deleteVastuTip(vastuTipId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vastu Tip deleted successfully",
    data: result,
  });
});

export const VastuTipsControllers = {
  addVastuTip,
  getAllVastuTips,
  getSingleVastuTipById,
  updateVastuTip,
  deleteVastuTip,
};
